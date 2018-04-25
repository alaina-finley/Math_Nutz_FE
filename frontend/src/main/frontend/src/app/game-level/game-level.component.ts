import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ProblemService } from '../problems/problems.service';
import { Problem } from '../problems/problem';
import { Router, ActivatedRoute } from '@angular/router';
import { GameProgressService } from '../progress/game-progress.service';
import { Progress } from '../progress/progress';
import { GameProblemService } from '../problems/game-problems.service';
import { GameCoinService } from '../coins/game-coins.service';
import { Coin } from '../coins/coin';

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
  currentUserId = JSON.parse(localStorage.getItem("user")).id;
  coins_earned = 0;

  constructor(
    private problemService: ProblemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameProgressService: GameProgressService,
    private gameProblemService: GameProblemService,
    private gameCoinService: GameCoinService,
  ) {}

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
    this.gameCoinService.instantiateCoins();

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
    this.gameCoinService.instantiateCoins();

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
  getCoinNum(): void {
    const coins_earned = Math.floor(Math.random() * ((25 - 5) + 1) + 5);
    this.updateUserCoins(coins_earned);
    this.coins_earned = coins_earned;
  }

  // update user coins
  updateUserCoins(coins_earned: number): void {
    const current_coins = this.gameCoinService.getTotalCoins(this.currentUserId);
    const new_total = coins_earned + current_coins;
    this.gameCoinService.updateCoins(this.currentUserId, new_total);
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

 getCoins(): number {
  return (this.gameCoinService.getTotalCoins(this.currentUserId));
}

 returnToMap(){
   this.router.navigate(['islandMap']);
 }

}
