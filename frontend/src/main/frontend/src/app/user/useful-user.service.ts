import { Injectable } from '@angular/core';
import { User } from './user';
import { Headers, Http } from '@angular/http';
import { UserService } from './users.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsefulUserService {
  users: User[];

  constructor(
    private userService: UserService,
  ){}

  instantiateUsers(): void {
    this.userService.getUsers().then(users => this.users = users).then(() => localStorage.setItem("users", JSON.stringify(this.users)));
  }

}
