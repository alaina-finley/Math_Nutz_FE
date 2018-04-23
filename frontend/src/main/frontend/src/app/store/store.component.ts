import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SimpleChanges } from '@angular/core';
import { CoinsService } from '../coins/coins.service';
import { Coins } from '../coins/coin';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  title = 'Store';
  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }
}
