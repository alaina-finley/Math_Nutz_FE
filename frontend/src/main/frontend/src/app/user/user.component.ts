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
  users: User[];

  public barChartLabels:string[] = ['Easy', 'Intermediate', 'Difficult'];
  public barChartData:any[] = [
    {data: [0,0,0], label: 'Correct'},
    {data: [0,0,0], label: 'Incorrect'}
  ];
  public barChartType:string = 'bar';
  public barChartTitle:string = '';
  public barChartLegend:boolean = true;
  public showCharts:boolean = false;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartUser:number = 0;


  constructor(
    private userService: UserService,
    private gameProgress: GameProgressService,
    private gameProblem: GameProblemService,
  ) { }

  ngOnInit() {
    // this.userArr = JSON.parse(localStorage.getItem("users"));
    this.getUsers();
  }

  generateGraph(id: number, name: string): void {
    // this.pieChartData = [this.getAllCorrect(id), (this.getAllTotal(id)-this.getAllCorrect(id))];
    // this.pieChartTitle = name;
    this.barChartUser = id;
    this.getAddition();
    this.barChartTitle = name;
    this.showCharts = true;
  }
  hideCharts(): void {
    this.showCharts = false;
    this.barChartUser = 0;
  }
  getAddition(): void {
    let correctArr = this.gameProgress.getAllCorrect(this.barChartUser);
    let totalArr = this.gameProgress.getAllTotal(this.barChartUser);
    let dataCorr = [correctArr[0], correctArr[1], correctArr[2]];
    let dataTot = [totalArr[0]-correctArr[0], totalArr[1]-correctArr[1], totalArr[2]-correctArr[2]];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = dataCorr;
    clone[1].data = dataTot;
    this.barChartData = clone;
  }
  getSubtraction(): void {
    let correctArr = this.gameProgress.getAllCorrect(this.barChartUser);
    let totalArr = this.gameProgress.getAllTotal(this.barChartUser);
    let dataCorr = [correctArr[3], correctArr[4], correctArr[5]];
    let dataTot = [totalArr[3]-correctArr[3], totalArr[4]-correctArr[4], totalArr[5]-correctArr[5]];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = dataCorr;
    clone[1].data = dataTot;
    this.barChartData = clone;
  }
  getPlaceValue(): void {
    let correctArr = this.gameProgress.getAllCorrect(this.barChartUser);
    let totalArr = this.gameProgress.getAllTotal(this.barChartUser);
    let dataCorr = [correctArr[6], correctArr[7], correctArr[8]];
    let dataTot = [totalArr[6]-correctArr[6], totalArr[7]-correctArr[7], totalArr[8]-correctArr[8]];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = dataCorr;
    clone[1].data = dataTot;
    this.barChartData = clone;
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
