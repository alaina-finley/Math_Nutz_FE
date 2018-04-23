import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameLevelComponent } from './game-level/game-level.component';
import { IslandMapComponent } from './island-map/island-map.component';
import { TeacherComponent } from './teacher/teacher.component';
import { UserComponent } from './user/user.component';
import { ProblemsComponent } from './problems/problems.component';
import { HomeLevelComponent } from './home-level/home-level.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'teacherView',
    component: TeacherComponent,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'problems', component: ProblemsComponent },
    ]
  },
  { path: 'islandMap',
    component: IslandMapComponent,
  },
  { path: 'game/:diff/:oper', component: GameLevelComponent },
  { path: 'homeIsland', component: HomeLevelComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' },

];

export const routes = RouterModule.forRoot(appRoutes);
