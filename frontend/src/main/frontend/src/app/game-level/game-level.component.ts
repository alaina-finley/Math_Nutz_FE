import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ProblemService } from '../problems/problems.service';
import { Problem } from '../problems/problem';
import { Router, ActivatedRoute } from '@angular/router';
import { GameProgressService } from '../progress/game-progress.service';
import { Progress } from '../progress/progress';
import { GameProblemService } from '../problems/game-problems.service';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit, OnChanges {
  difficulty = 1; //5 for easy, 50 for medium, 500 for hard
  operation = 0; // 0 for +, 1 for -, 2 for place value
  // difficulty = 10;
  currentQues = null;
  currentAns = null;
  quesSelected = false;
  correctAns = false;
  rewardPhase = false;
  // equals 1 if ans is correct, 0 if not
  currentCorrect = null;
  questions = [];
  previouslycompleted = 0;
  dbquestions = [];

  // Pie
  public pieChartLabels:string[] = ['Correct', 'Incorrect'];
  public pieChartData:number[] = [0,0];
  public pieChartType:string = 'pie';
  public showCharts:boolean = false;

  constructor(
    private problemService: ProblemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameProgressService: GameProgressService,
    private gameProblemService: GameProblemService,
  ){}

  generateGraph(): void {
    let us_id = JSON.parse(localStorage.getItem("user")).id;
    let sr = (JSON.parse(localStorage.getItem("progresses"))).find(p => p.student_id == us_id);
    let arrOfTotal = [sr.lev11_total, sr.lev12_total, sr.lev13_total, sr.lev21_total, sr.lev22_total, sr.lev23_total, sr.lev31_total, sr.lev32_total, sr.lev33_total, sr.boss_total];
    let arrOfCorr = [sr.lev11_correct, sr.lev12_correct, sr.lev13_correct, sr.lev21_correct, sr.lev22_correct, sr.lev23_correct, sr.lev31_correct, sr.lev32_correct, sr.lev33_correct, sr.boss_correct];
    console.log("Grabbed data");
    if(this.difficulty == 5){
      if(this.operation == 0){
        this.pieChartData = [arrOfCorr[0], arrOfTotal[0]-arrOfCorr[0]];
      }else if(this.operation == 1){
        this.pieChartData = [arrOfCorr[3], arrOfTotal[3]-arrOfCorr[3]];
      }else{
        this.pieChartData = [arrOfCorr[6], arrOfTotal[6]-arrOfCorr[6]];
      }
    }else if(this.difficulty == 50){
      if(this.operation == 0){
        this.pieChartData = [arrOfCorr[1], arrOfTotal[1]-arrOfCorr[1]];
      }else if(this.operation == 1){
        this.pieChartData = [arrOfCorr[4], arrOfTotal[4]-arrOfCorr[4]];
      }else{
        this.pieChartData = [arrOfCorr[7], arrOfTotal[7]-arrOfCorr[7]];
      }
    }else{
      if(this.operation == 0){
        this.pieChartData = [arrOfCorr[2], arrOfTotal[2]-arrOfCorr[2]];
      }else if(this.operation == 1){
        this.pieChartData = [arrOfCorr[5], arrOfTotal[5]-arrOfCorr[5]];
      }else{
        this.pieChartData = [arrOfCorr[8], arrOfTotal[8]-arrOfCorr[8]];
      }
    }
    console.log("Data: " + this.pieChartData);
    this.showCharts = true;
  }
  hideCharts(): void {
    this.showCharts = false;
  }

  createRandomProblems(){
    var quesArray: any[];
    for(let i=0; i<10; i++){
      let tmp = Math.floor(Math.random()*this.difficulty);
      let tmp2 = Math.floor(Math.random()*this.difficulty);
      let first = Math.max(tmp, tmp2);
      let second = Math.min(tmp, tmp2);
      quesArray[i] = {'first': first, 'second': second, 'operation': this.operation, 'completed':false};
    }
    return quesArray;

  }

  ngOnChanges(changes: SimpleChanges){
    // get difficulty and operation from route
    this.difficulty = this.activatedRoute.snapshot.params.diff;
    this.operation = this.activatedRoute.snapshot.params.oper;
    this.gameProgressService.instantiateProgresses();
    this.gameProblemService.instantiateProblems();

    // get progress of student, database questions, and student id from local storage
    var us_id = JSON.parse(localStorage.getItem("user")).id;
    var prog = JSON.parse(localStorage.getItem("progresses"));
    this.dbquestions = this.gameProblemService.filterDBProblems(JSON.parse(localStorage.getItem("problems")), this.difficulty, this.operation);
    this.previouslycompleted = this.gameProgressService.findCompleted(us_id, prog, this.difficulty, this.operation);

    this.generateProbs(this.dbquestions);
  }

  ngOnInit() {
    // get difficulty and operation from route
    this.difficulty = this.activatedRoute.snapshot.params.diff;
    this.operation = this.activatedRoute.snapshot.params.oper;
    this.gameProgressService.instantiateProgresses();
    this.gameProblemService.instantiateProblems();

    // get progress of student, database questions, and student id from local storage
    var us_id = JSON.parse(localStorage.getItem("user")).id;
    var prog = JSON.parse(localStorage.getItem("progresses"));
    this.dbquestions = this.gameProblemService.filterDBProblems(JSON.parse(localStorage.getItem("problems")), this.difficulty, this.operation);
    this.previouslycompleted = this.gameProgressService.findCompleted(us_id, prog, this.difficulty, this.operation);

    this.generateProbs(this.dbquestions);
  }

  teacherSkip() {
    this.rewardPhase = true;
    this.currentCorrect = 1;
    // this.setCoinNum();
  }

  checkIfSkip(): boolean{
    return 'demo' == (JSON.parse(localStorage.getItem("user"))).role;
  }

  generateProbs(dbProbs: any[]): void {
    var tmpQs= [];
    let tmp, tmp2 = 0;
    for(let i=0; i<10; i++){
      if(i<dbProbs.length){
        this.questions[i] = {'first': dbProbs[i].first, 'second': dbProbs[i].second, 'operation': dbProbs[i].operation, 'completed':false, 'rewardType': -1};
      }else{
        if(this.operation==2){
          if(this.difficulty==5){
            tmp = (Math.floor(Math.random()*10))*10;
            tmp2 = Math.floor(Math.random()*10);
          }else if(this.difficulty==50){
            tmp = (Math.floor(Math.random()*100))*10;
            tmp2 = Math.floor(Math.random()*10);
          }else{
            tmp = Math.floor(Math.random()*this.difficulty);
            tmp2 = Math.floor(Math.random()*this.difficulty);
          }
        }else{
          tmp = Math.floor(Math.random()*this.difficulty);
          tmp2 = Math.floor(Math.random()*this.difficulty);
        }
        let first = Math.max(tmp, tmp2);
        let second = Math.min(tmp, tmp2);
        this.questions[i] = {'first': first, 'second': second, 'operation': this.operation, 'completed':false, 'rewardType': -1};
      }
      if(i>(9-this.previouslycompleted)){
        this.questions[i].completed = true;
      }
      if (i === 2 || i === 5 || i === 8) {
        this.questions[i].rewardType = 1; //won eg piece
      } else {
        this.questions[i].rewardType = 0; //won $MONEYZ
      }
    }
  }

  // sets coinNum to a random number between 5 and 25
  setCoinNum(): number {
    return Math.floor(Math.random() * ((25 - 5) + 1) + 5);
  }

 displayProb(prob: number): void {
   if (this.quesSelected == false){
     this.currentQues = this.questions[prob];
     this.quesSelected = !this.quesSelected;
   }
 }

 checkAns(ques: any, ans: number): void {
   let correct: boolean = false;
   if(ques.operation == 0 || ques.operation == 2){
      correct = (ques.first+ques.second == ans);
      this.currentCorrect = (ques.first+ques.second == ans)? 1 : 0;
      this.currentAns = ques.first+ques.second;
    }else{
      correct = (ques.first-ques.second == ans);
      this.currentCorrect = (ques.first-ques.second == ans)? 1 : 0;
      this.currentAns = ques.first-ques.second;
    }
    this.rewardPhase = true;
 }

 resetBoard(ques: any, correct: boolean): void {
   if(correct) {
     ques.completed = correct;
     // increments total and correct
     this.gameProgressService.incrementLevCorrect((JSON.parse(localStorage.getItem('user'))).id, this.difficulty, this.operation);
   } else {
     let tmp = Math.floor(Math.random()*this.difficulty);
     let tmp2 = Math.floor(Math.random()*this.difficulty);
     let first = Math.max(tmp, tmp2);
     let second = Math.min(tmp, tmp2);
     ques.first = first;
     ques.second = second;
     this.gameProgressService.incrementLevTotal((JSON.parse(localStorage.getItem('user'))).id, this.difficulty, this.operation);
   }

   this.currentQues = null;
   this.currentAns = null;
   this.quesSelected = false;
   this.rewardPhase = false;
 }

 returnToMap(){
   this.router.navigate(['islandMap']);
 }

}
