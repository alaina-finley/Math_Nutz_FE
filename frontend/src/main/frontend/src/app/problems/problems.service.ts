import { Injectable } from '@angular/core';
import { Problem } from './problem';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProblemService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getProblems():  Promise<Problem[]> {
    return this.http.get(this.baseUrl + '/api/problems/')
      .toPromise()
      .then(response => response.json() as Problem[])
      .catch(this.handleError);
  }

  createProblem(problemData: Problem): Promise<Problem> {
    return this.http.post(this.baseUrl + '/api/problems/', problemData)
      .toPromise().then(response => response.json() as Problem)
      .catch(this.handleError);
  }

  updateProblem(problemData: Problem): Promise<Problem> {
    return this.http.put(this.baseUrl + '/api/problems/' + problemData.id, problemData)
      .toPromise()
      .then(response => response.json() as Problem)
      .catch(this.handleError);
  }

  deleteProblem(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/problems/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
