import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { CoinService } from '../coins/coins.service';
import { Coin } from '../coins/coin';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  // template: `<button (click)="onClickMe()">Buy</button>
  // {{clickMessage}}`
})
export class StoreComponent implements OnInit {
  title = 'Store';
  //coins: Coin[];

  constructor(
    private router: Router,
    //private coinService: CoinService,
  ) { }

  ngOnInit() {
  }

  returnMap(){
    console.log("excellent");
    this.router.navigate(['../islandMap']);
  }

  buyItem(itemNo: number): void {

  }

  getCoins(): void {
    // this.coinService.getCoins()
    //   .then(coins => this.coins = coins );
  }


}
