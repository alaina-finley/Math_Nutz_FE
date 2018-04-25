import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GameProgressService } from './progress/game-progress.service';
import { GameProblemService } from './problems/game-problems.service';
import { UsefulUserService } from './user/useful-user.service';
import { GameCoinService } from './coins/game-coins.service';
import { GameStoreService } from './store/game-store.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnChanges {
  constructor(
    public gameProgressService: GameProgressService, // change this to public
    public gameProblemService: GameProblemService, // change this to public
    public usefulUserService: UsefulUserService,
    public gameCoinService: GameCoinService,
    public gameStoreService: GameStoreService,
  ) {}

  ngOnInit() {
    this.gameProgressService.instantiateProgresses();
    this.gameProblemService.instantiateProblems();
    this.usefulUserService.instantiateUsers();
    this.gameCoinService.instantiateCoins();
    this.gameStoreService.instantiateStore();

  }

  ngOnChanges(changes: SimpleChanges){
    this.gameProgressService.instantiateProgresses();
    this.gameProblemService.instantiateProblems();
    this.usefulUserService.instantiateUsers();
    this.gameCoinService.instantiateCoins();
    this.gameStoreService.instantiateStore();

  }
}
