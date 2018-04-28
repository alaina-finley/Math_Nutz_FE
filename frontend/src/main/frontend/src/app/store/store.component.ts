import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GameCoinService } from '../coins/game-coins.service';
import { Coin } from '../coins/coin';
import { Router, ActivatedRoute } from '@angular/router';
import { GameStoreService } from './game-store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  title = 'Store';
  currentUserId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
    private router: Router,
    private gameCoinService: GameCoinService,
    private gameStoreService: GameStoreService,
  ) { }

  ngOnInit() {
  }

  returnMap() {
    console.log('excellent');
    this.router.navigate(['../islandMap']);
  }

  buyItem(itemNo: number): void {
    // how to access store properties?
    const current_coins = this.gameCoinService.getTotalCoins(this.currentUserId);
    let itemCost = 0;
    if (itemNo == 1) {
      itemCost = 150;
    }
    if (itemNo == 2) {
      itemCost = 10;
    }
    if (itemNo == 3) {
      itemCost = 30;
    }
    if (itemNo == 4) {
      itemCost = 50;
    }
    if (itemNo == 5) {
      itemCost = 70;
    }
    const new_total = current_coins - itemCost;
    this.updateCoins(new_total);
    this.gameStoreService.updateStore(this.currentUserId, itemNo);
  }

  checkIfPossible(itemNo: number): boolean {
    const current_coins = this.gameCoinService.getTotalCoins(this.currentUserId);
    let coins_sufficient = false;
    let itemCost = 0;
    let alreadyBought = false;
    if (itemNo === 1) {
      alreadyBought = this.gameStoreService.isItem1Purchased(this.currentUserId);
      itemCost = 150;
      if (current_coins >= itemCost) {
        coins_sufficient = true;
      }
    }
    if (itemNo === 2) {
      alreadyBought = this.gameStoreService.isItem2Purchased(this.currentUserId);
      itemCost = 10;
      if (current_coins >= itemCost) {
        coins_sufficient = true;
      }
    }
    if (itemNo === 3) {
      alreadyBought = this.gameStoreService.isItem3Purchased(this.currentUserId);
      itemCost = 30;
      if (current_coins >= itemCost) {
        coins_sufficient = true;
      }
    }
    if (itemNo === 4) {
      alreadyBought = this.gameStoreService.isItem4Purchased(this.currentUserId);
      itemCost = 50;
      if (current_coins >= itemCost) {
        coins_sufficient = true;
      }
    }
    if (itemNo === 5) {
      alreadyBought = this.gameStoreService.isItem5Purchased(this.currentUserId);
      itemCost = 70;
      if (current_coins >= itemCost) {
        coins_sufficient = true;
      }
    }
    if (alreadyBought === true) {
      return false;
    }
    if (coins_sufficient) {
      return true;
    }
    // if coins not sufficient
    return false;
  }

  updateCoins(coins: number): void {
    this.gameCoinService.updateCoins(this.currentUserId, coins);
  }

  getCoins(): number {
    return (this.gameCoinService.getTotalCoins(this.currentUserId));
  }
}
