import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/users.service';
import { User } from '../user/user';
import { GameProgressService } from '../progress/game-progress.service';
import { Progress } from '../progress/progress';
import { GameProblemService } from '../problems/game-problems.service';
import { Problem } from '../problems/problem';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    // this.userArr = JSON.parse(localStorage.getItem("users"));
    // this.getUsers();
  }

  logout(){
    this.auth.logout()
  }


}
