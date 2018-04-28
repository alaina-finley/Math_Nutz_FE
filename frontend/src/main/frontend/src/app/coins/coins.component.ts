import { Component, Input, OnInit } from '@angular/core';
import { CoinService } from './coins.service';
import { Coin } from './coin';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  coins: Coin[];

  constructor(
    private coinService: CoinService,
  ) { }

  ngOnInit(): void {
    this.getCoins();
  }

  getCoins(): void {
    this.coinService.getCoins()
      .then(coins => this.coins = coins );
  }

  createCoin(total_coins: number): void {
    //var total_coins = //getFromDB;
    //var student_id = //getfromDB;
    // var diff = +(<HTMLInputElement>document.querySelector('input[name=difficulty]:checked')).value;
    // var oper = +(<HTMLInputElement>document.querySelector('input[name=oper]:checked')).value;
    //    this.coinService.createCoin(new Coin(this.getNextIndex(), student_id, total_coins))
    this.coinService.createCoin(new Coin(this.getNextIndex(), 1, 30))
      .then(createCoin => {
        this.coins.unshift(createCoin)
      })
      .then(() => {
        // var tmp = [];
        // localStorage.setItem('coins', JSON.stringify(tmp));
      });
  }

  deleteCoin(id: number): void {
    this.coinService.deleteCoin(id)
    .then(() => {
      this.coins = this.coins.filter(coin => coin.id != id);
    })
    .then(() => {
      // var tmp = [];
      // localStorage.setItem("coins", JSON.stringify(tmp));
    });
  }

  updateCoin(coinData: Coin): void {
    console.log(coinData);
    this.coinService.updateCoin(coinData)
    .then(updatedCoin => {
      let existingCoin = this.coins.find(coin => coin.id === updatedCoin.id);
      Object.assign(existingCoin, updatedCoin);
      // this.clearEditing();
    });
  }

  getNextIndex(): number{
    // var coinArr = JSON.parse(localStorage.getItem("coins"));
    // var ind=0;
    // coinArr.forEach(function(value){
    //   if(value.id>ind && value.operation != -1){
    //     ind = value.id;
    //   }
    // });
    // return ind+1;
    return 0;
  }

  logIt(){
    // var radios = document.getElementsByName("difficulty");
    // var radios2 = document.getElementsByName("oper");
    // for (var i = 0, length = radios.length; i < length; i++){
    //    if (radios[i].checked){
    //      console.log(radios[i].value)
    //      break;
    //    }
    // }
    // for (var j = 0, length = radios2.length; j < length; j++){
    //    if (radios2[j].checked){
    //      console.log(radios2[j].value)
    //      break;
    //    }
    // }
    console.log((<HTMLInputElement>document.querySelector('input[name=difficulty]:checked')).value);
    console.log((<HTMLInputElement>document.querySelector('input[name=oper]:checked')).value);
  }

}
