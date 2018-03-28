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
  newProblem: Problem = new Problem();
  // editingProblem: Problem = new Problem(); //wiggity?

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

  createProblem(problemForm: NgForm): void {
    this.problemService.createProblem(this.newProblem)
      .then(createProblem => {
        problemForm.reset();
        this.newProblem = new Problem();
        this.problems.unshift(createProblem)
      });
  }

  deleteProblem(id: number): void {
    this.problemService.deleteProblem(id)
    .then(() => {
      this.problems = this.problems.filter(problem => problem.id != id);
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

}
