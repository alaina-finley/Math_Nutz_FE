import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameProgressService } from '../progress/game-progress.service';

@Component({
  selector: 'app-home-level',
  templateUrl: './home-level.component.html',
  styleUrls: ['./home-level.component.css']
})
export class HomeLevelComponent implements OnInit {

  constructor(
    private router: Router,
    private gameProgressService: GameProgressService,
  ) { }

  ngOnInit() {

  }

  returnMap(){
    console.log("excellent");
    this.router.navigate(['../islandMap']);
  }

  //returns whether this user is 'demo'
  isDemo(){
    return 'demo' == (JSON.parse(localStorage.getItem("user"))).role;
  }

  shouldDisplay(diff: number, oper: number){
    // var sr = (JSON.parse(localStorage.getItem("progresses"))).find(p => p.student_id == studentId);
    let idNo = JSON.parse(localStorage.getItem("user")).id;
    let records = JSON.parse(localStorage.getItem("progresses"));
    return (this.gameProgressService.findCompleted(idNo, records, diff, oper) >= 10)
  }

}
