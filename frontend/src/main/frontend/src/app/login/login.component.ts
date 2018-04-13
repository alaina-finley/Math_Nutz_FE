import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
// import { User} from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public user = new User('','','');

  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.auth.instantiateUsers();
  }

  login(first: string, second: string): void {
    this.auth.login(first, second);
  }

  view(): void {
    console.log((localStorage.getItem('user')));
  }

}
