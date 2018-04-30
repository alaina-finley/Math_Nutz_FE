import { Injectable } from '@angular/core';
import { Progress } from './progress';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProgressService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getProgresses():  Promise<Progress[]> {
    return this.http.get(this.baseUrl + '/api/progresses/')
      .toPromise()
      .then(response => response.json() as Progress[])
      .catch(this.handleError);
  }

  createProgress(progressData: Progress): Promise<Progress> {
    return this.http.post(this.baseUrl + '/api/progresses/', progressData)
      .toPromise().then(response => response.json() as Progress)
      .catch(this.handleError);
  }

  updateProgress(progressData: Progress): Promise<Progress> {
    return this.http.put(this.baseUrl + '/api/progresses/' + progressData.id, progressData)
      .toPromise()
      .then(response => response.json() as Progress)
      .catch(this.handleError);
  }

  deleteProgress(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/progresses/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
