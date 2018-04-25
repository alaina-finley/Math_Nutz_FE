import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-island-map',
  templateUrl: './island-map.component.html',
  styleUrls: ['./island-map.component.css']
})
export class IslandMapComponent implements OnInit {
  title = 'Island Map';
  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
