import { Component, Input, OnInit } from '@angular/core';
import { ProblemService } from './problems.service';
import { Problem } from './problem';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  problems: Problem[];
  // newProblem: Problem = new Problem();

  constructor(
    private problemService: ProblemService,
  ) { }

  ngOnInit(): void {
    this.getProblems();
  }

  getProblems(): void {
    this.problemService.getProblems()
      .then(problems => this.problems = problems );
  }

  createProblem(first: number, second:number): void {
    var diff = +(<HTMLInputElement>document.querySelector('input[name=difficulty]:checked')).value;
    var oper = +(<HTMLInputElement>document.querySelector('input[name=oper]:checked')).value;
    this.problemService.createProblem(new Problem(this.getNextIndex(),first,second,oper,diff))
      .then(createProblem => {
        this.problems.unshift(createProblem)
      })
      .then(() => {
        var tmp = [];
        this.problems.forEach(function(value){
          if(value.operation != -1){
            tmp.push(value);
          }
        });
        localStorage.setItem("problems", JSON.stringify(tmp));
      });
  }

  deleteProblem(id: number): void {
    this.problemService.deleteProblem(id)
    .then(() => {
      this.problems = this.problems.filter(problem => problem.id != id);
    })
    .then(() => {
      var tmp = [];
      this.problems.forEach(function(value){
        if(value.operation != -1){
          tmp.push(value);
        }
      });
      localStorage.setItem("problems", JSON.stringify(tmp));
    });
  }

  updateProblem(problemData: Problem): void {
    console.log(problemData);
    this.problemService.updateProblem(problemData)
    .then(updatedProblem => {
      let existingProblem = this.problems.find(problem => problem.id === updatedProblem.id);
      Object.assign(existingProblem, updatedProblem);
      // this.clearEditing();
    });
  }

  getNextIndex(): number{
    var probArr = JSON.parse(localStorage.getItem("problems"));
    var ind=0;
    probArr.forEach(function(value){
      if(value.id>ind && value.operation != -1){
        ind = value.id;
      }
    });
    return ind+1;
  }

  logIt(){
    // var radios = document.getElementsByName("difficulty");
    // var radios2 = document.getElementsByName("oper");
    // for (var i = 0, length = radios.length; i < length; i++){
    //    if (radios[i].checked){
    //      console.log(radios[i].value)
    //      break;
    //    }
    // }
    // for (var j = 0, length = radios2.length; j < length; j++){
    //    if (radios2[j].checked){
    //      console.log(radios2[j].value)
    //      break;
    //    }
    // }
    console.log((<HTMLInputElement>document.querySelector('input[name=difficulty]:checked')).value);
    console.log((<HTMLInputElement>document.querySelector('input[name=oper]:checked')).value);
  }

}
