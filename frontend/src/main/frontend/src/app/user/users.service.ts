import { Injectable } from '@angular/core';
import { User } from './user';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getUsers():  Promise<User[]> {
    return this.http.get(this.baseUrl + '/api/users/')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  createUser(userData: User): Promise<User> {
    return this.http.post(this.baseUrl + '/api/users/', userData)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updateUser(userData: User): Promise<User> {
    return this.http.put(this.baseUrl + '/api/users/' + userData.id, userData)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/users/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
