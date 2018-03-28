import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GameLevelComponent } from './game-level/game-level.component';
import { ProblemsComponent } from './problems/problems.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ProblemService } from './problems/problems.service';
// import {MatButtonModule,
//  MatCheckboxModule,
//  MatCardModule,
//  MatProgressSpinnerModule,
// MatToolbarModule} from '@angular/material';
@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule, HttpClientModule, HttpModule ],
  declarations: [ AppComponent, GameLevelComponent, ProblemsComponent ],
  providers: [ ProblemService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
