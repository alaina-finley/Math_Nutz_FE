import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';
import { User } from './user';
import { GameProgressService } from '../progress/game-progress.service';
import { Progress } from '../progress/progress';
import { GameProblemService } from '../problems/game-problems.service';
import { Problem } from '../problems/problem';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // userArr = [];
  users: User[];
  // newUser: User = new User(,'dumb','dumb','test');

  constructor(
    private userService: UserService,
    private gameProgress: GameProgressService,
    private gameProblem: GameProblemService,
  ) { }

  ngOnInit() {
    // this.userArr = JSON.parse(localStorage.getItem("users"));
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users );
  }

  createUser(usern: string, passw: string): void {
    this.userService.createUser(new User(this.getNextIndex(),usern,passw,'student'))
      .then(createUser => {
        this.users.unshift(createUser);
      })
      .then(() => {
        var tmp = [];
        this.users.forEach(function(value){
          if(value.role != "empty"){
            tmp.push(value);
          }
        });
        localStorage.setItem("users", JSON.stringify(tmp));
      });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id)
    .then(() => {
      this.users = this.users.filter(user => user.id != id);
    })
    .then(() => {
      var tmp = [];
      this.users.forEach(function(value){
        if(value.role != "empty"){
          tmp.push(value);
        }
      });
      localStorage.setItem("users", JSON.stringify(tmp));
    });
  }

  getAllTotal(userId: number){
    var totArr = this.gameProgress.getAllTotal(userId);
    var count = 0;
    for(var i=0; i<totArr.length; i++){
      count += totArr[i];
    }
    return count > 0 ? count : 1;
  }

  getAllCorrect(userId: number){
    var totArr = this.gameProgress.getAllCorrect(userId);
    var count = 0;
    for(var i=0; i<totArr.length; i++){
      count += totArr[i];
    }
    return count;
  }

  getNextIndex(): number{
    var userArr = JSON.parse(localStorage.getItem("users"));
    var ind=0;
    userArr.forEach(function(value){
      if(value.id>ind && value.role != "empty"){
        ind = value.id;
      }
    });
    return ind+1;
  }

}
