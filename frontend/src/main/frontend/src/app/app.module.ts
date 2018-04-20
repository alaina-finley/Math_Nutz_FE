import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GameLevelComponent } from './game-level/game-level.component';
import { ProblemsComponent } from './problems/problems.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { IslandMapComponent } from './island-map/island-map.component';

import { ProblemService } from './problems/problems.service';
import { UserService } from './user/users.service';
import { AuthenticationService } from './login/authentication.service';
import { ProgressService } from './progress/progress.service';
import { GameProgressService } from './progress/game-progress.service';
import { GameProblemService } from './problems/game-problems.service';
import { UsefulUserService } from './user/useful-user.service';

import { routes } from './app.routes';
import { ProgressComponent } from './progress/progress.component';
import { TeacherComponent } from './teacher/teacher.component';
import { HomeLevelComponent } from './home-level/home-level.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule, HttpClientModule, HttpModule, routes ],
  declarations: [ AppComponent, GameLevelComponent, ProblemsComponent, UserComponent, LoginComponent, IslandMapComponent, ProgressComponent, TeacherComponent, HomeLevelComponent ],
  providers: [ ProblemService, UserService, AuthenticationService, ProgressService, GameProgressService, GameProblemService, UsefulUserService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
