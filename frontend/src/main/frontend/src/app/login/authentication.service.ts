import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { UserService } from '../user/users.service';

// var users = [
//   new User(0,'elite','123', 'Teacher'),
//   new User(1,'scrub','abc', 'Student')
// ];

@Injectable()
export class AuthenticationService {
  users: User[];

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  logout() {
    localStorage.removeItem('user');
    this.checkCredentials();
  }

  login(username: string, password: string) {
    // let us = new User(0, username, password, '');
    // console.log(us);
    const authenticatedUser = this.users.find(u => u.username === username && u.password === password);
    console.log('Authenticated User: ');
    console.log(authenticatedUser);
    if (authenticatedUser) {
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      if (authenticatedUser.role === 'teacher') {
        this.router.navigate(['teacherView']);
      } else {
        this.router.navigate(['islandMap']);
      }
    } else {
      alert('You have entered an incorrect username or password.');
    }
    // return false;

  }

   checkCredentials( ) {
    if (localStorage.getItem('user') === null) {
        this.router.navigate(['']);
    }
  }

  instantiateUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
  }
}
