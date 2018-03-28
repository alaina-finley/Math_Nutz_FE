import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  // for operation: 0=addition, 1=subtraction

 //  difficulty = 10;
 //  currentQues = null;
 //  currentAns = null;
 //  quesSelected = false;
 //  correctAns = false;
 //  rewardPhase = false;
 //  // equals 1 if ans is correct, 0 if not
 //  currentCorrect = null;
 //  questions = [];
 //
 //  generateProbs(operation: number): void {
 //    for(let i=0; i<10; i++){
 //      this.questions[i] = {'first': Math.floor(Math.random()*this.difficulty), 'second': Math.floor(Math.random()*this.difficulty), 'operation': operation, 'completed':false}
 //    }
 //  }
 //
 //  ngOnInit() {
 //    this.generateProbs(0);
 //  }
 //
 // displayProb(prob: number): void {
 //   if (this.quesSelected == false){
 //     this.currentQues = this.questions[prob];
 //     this.quesSelected = !this.quesSelected;
 //   }
 // }
 //
 // checkAns(ques: any, ans: number): void {
 //   let correct: boolean = false;
 //   if(ques.operation == 0){
 //      correct = (ques.first+ques.second == ans);
 //      this.currentCorrect = (ques.first+ques.second == ans)? 1 : 0;
 //      this.currentAns = ques.first+ques.second;
 //    }else{
 //      correct = (ques.first-ques.second == ans);
 //      this.currentCorrect = (ques.first-ques.second == ans)? 1 : 0;
 //      this.currentAns = ques.first-ques.second;
 //    }
 //    this.rewardPhase = true;
 //    // this.quesSelected = !this.quesSelected;
 // }
 //
 // resetBoard(ques: any, correct: boolean): void {
 //   if(correct) {
 //     ques.completed = correct;
 //   } else {
 //     ques.first = Math.floor(Math.random()*this.difficulty);
 //     ques.second = Math.floor(Math.random()*this.difficulty);
 //   }
 //   this.currentQues = null;
 //   this.currentAns = null;
 //   this.quesSelected = false;
 //   this.rewardPhase = false;
 // }

}
