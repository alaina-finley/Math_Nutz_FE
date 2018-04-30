import { Component, OnInit, trigger, state, style } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
// import { Transform } from 'stream';

@Component({
  selector: 'app-island-map',
  templateUrl: './island-map.component.html',
  styleUrls: ['./island-map.component.css'],

  // animations:[
  //  trigger('islandState', 
  //   [
  //    state('inactive', style({Transform: 'scale(1)'})),
  //    state('active', style({Transform: 'scale(1.5)' }))
  //   ])
  // ]
})

export class IslandMapComponent implements OnInit {
  title = 'Island Map'
  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
