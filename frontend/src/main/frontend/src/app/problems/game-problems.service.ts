import { Injectable } from '@angular/core';
import { Problem } from './problem';
import { Headers, Http } from '@angular/http';
import { ProblemService } from './problems.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameProblemService {
  problems: Problem[];
  formattedProblems: any[];

  constructor(
    private problemService: ProblemService,
  ) {}

  instantiateProblems(): void {
    this.problemService.getProblems().then(problems => this.problems = problems).then(() =>
    localStorage.setItem('problems', JSON.stringify(this.problems)));
    this.problemService.getProblems().then(problems => console.log(problems));
    // this.getDBProblems();

  }

  filterDBProblems(arr: any[], diff: number, operation: number): any[] {
    const tmp = [];
    arr.forEach(function(value) {
      if (value.difficulty === diff && value.operation === operation) {
        tmp.push(value);
      }
    });
    return tmp;
  }

  helper(arr: any[]): any[] {
    const tmp = [];
    // console.log("helper");
    arr.forEach(function(value) {
      // console.log({'first': value.first, 'second': value.second, 'operation': value.operation, 'completed':false});
      tmp.push({'first': value.first, 'second': value.second, 'operation': value.operation, 'completed': false});
    });
    return tmp;
  }

}
