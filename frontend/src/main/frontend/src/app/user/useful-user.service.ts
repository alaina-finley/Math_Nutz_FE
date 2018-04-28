import { Injectable } from '@angular/core';
import { User } from './user';
import { Headers, Http } from '@angular/http';
import { UserService } from './users.service';
// import {NgForm} from '@angular/forms';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsefulUserService {
  users: User[];
  // newUser: User = new User();
  // newUser.role = 'student'; //?

  constructor(
    private userService: UserService,
  ){}

  instantiateUsers(): void {
    this.userService.getUsers().then(users => this.users = users).then(() => {
      // localStorage.setItem("users", JSON.stringify(this.users));
      var tmp = [];
      this.users.forEach(function(value){
        if(value.role != 'empty'){
          tmp.push(value);
        }
      });
      localStorage.setItem("users", JSON.stringify(tmp));
    });
  }

  // createUser(todoForm: NgForm): void {
  //   this.userService.createUser(this.newUser)
  //     .then(createUser => {
  //       todoForm.reset();
  //       this.newUser = new User();
  //       this.users.unshift(createUser);
  //     });
  // }

}
