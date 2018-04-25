import { Injectable } from '@angular/core';
import { Coin } from './coin';
import { Headers, Http } from '@angular/http';
import { CoinService } from './coins.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameCoinService {
  coins: Coin[];

  constructor(
    private coinService: CoinService,
  ) {}

  getTotalCoins(student_id: number): number {
    var sr = (JSON.parse(localStorage.getItem("coins"))).find(p => p.student_id == student_id);
    return sr.total_coins;
  }

  updateCoins(student_id: number, new_total: number): void {
    var toBeUpdated = this.coins.find(p => p.student_id == student_id);
    toBeUpdated.total_coins = new_total;
    this.coinService.updateCoin(toBeUpdated).then(() => localStorage.setItem("coins", JSON.stringify(this.coins)));
  }

  //whats going on when we do a .then(coins => this.coins = coins)
  instantiateCoins(): void {
    this.coinService.getCoins().then(coins => this.coins = coins).then(() => localStorage.setItem("coins", JSON.stringify(this.coins)));
  }

}
