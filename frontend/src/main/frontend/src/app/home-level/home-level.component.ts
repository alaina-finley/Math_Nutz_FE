import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameProgressService } from '../progress/game-progress.service';
import { GameStoreService } from '../store/game-store.service';

@Component({
  selector: 'app-home-level',
  templateUrl: './home-level.component.html',
  styleUrls: ['./home-level.component.css']
})
export class HomeLevelComponent implements OnInit {
  currentUserId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
    private router: Router,
    private gameProgressService: GameProgressService,
    private gameStoreService: GameStoreService,
  ) { }

  ngOnInit() {

  }

  returnMap(){
    console.log("excellent");
    this.router.navigate(['../islandMap']);
  }

  isDemo(){
    return 'demo' == (JSON.parse(localStorage.getItem("user"))).role;
  }

  shouldDisplay(diff: number, oper: number){
    // var sr = (JSON.parse(localStorage.getItem("progresses"))).find(p => p.student_id == studentId);
    let idNo = JSON.parse(localStorage.getItem("user")).id;
    let records = JSON.parse(localStorage.getItem("progresses"));
    return (this.gameProgressService.findCompleted(idNo, records, diff, oper) >= 10);
  }

  itemShouldDisplay(itemNoPurchased: number): boolean {
    let isPurchased = false;
    if (itemNoPurchased === 1) {
      isPurchased = this.gameStoreService.isItem1Purchased(this.currentUserId);
    }
    if (itemNoPurchased === 2) {
      isPurchased = this.gameStoreService.isItem2Purchased(this.currentUserId);
    }
    if (itemNoPurchased === 3) {
      isPurchased = this.gameStoreService.isItem3Purchased(this.currentUserId);
    }
    if (itemNoPurchased === 4) {
      isPurchased = this.gameStoreService.isItem4Purchased(this.currentUserId);
    }
    if (itemNoPurchased === 5) {
      isPurchased = this.gameStoreService.isItem5Purchased(this.currentUserId);
    }
    if (isPurchased) {
      return true;
    }
    return false;
  }

}
