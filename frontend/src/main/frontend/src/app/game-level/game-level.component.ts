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

  constructor(
    private problemService: ProblemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameProgressService: GameProgressService,
    private gameProblemService: GameProblemService,
  ){}

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

  generateProbs(dbProbs: any[]): void {
    // var progresses = JSON.parse(localStorage.getItem("progress"));
    // var relevant = progresses.find(p => p.student_id == );
    var tmpQs= [];
    for(let i=0; i<10; i++){
      if(i<dbProbs.length){
        this.questions[i] = {'first': dbProbs[i].first, 'second': dbProbs[i].second, 'operation': dbProbs[i].operation, 'completed':false};
      }else{
        let tmp = Math.floor(Math.random()*this.difficulty);
        let tmp2 = Math.floor(Math.random()*this.difficulty);
        let first = Math.max(tmp, tmp2);
        let second = Math.min(tmp, tmp2);
        this.questions[i] = {'first': first, 'second': second, 'operation': this.operation, 'completed':false};
      }
      if(i>(9-this.previouslycompleted)){
        this.questions[i].completed = true;
      }
    }
  }

 displayProb(prob: number): void {
   // // var allProblems = (this.gameProblemService.getDBProblems()).concat(this.createRandomProblems());
   // var allProblems = this.createRandomProblems();
   // var numNeeded = this.gameProgressService.findCompleted((JSON.parse(localStorage.getItem('user'))).id, this.difficulty, this.operation);
   // for(let i=0; i< 10; i++){
   //   this.questions[i] = allProblems[i];
   // }

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
     this.gameProgressService.incrementLevCorrect((JSON.parse(localStorage.getItem('user'))).id, this.difficulty, this.operation);
     this.gameProgressService.incrementLevTotal((JSON.parse(localStorage.getItem('user'))).id, this.difficulty, this.operation);
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
