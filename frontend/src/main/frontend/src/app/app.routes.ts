import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameLevelComponent } from './game-level/game-level.component';
import { IslandMapComponent } from './island-map/island-map.component';
import { TeacherComponent } from './teacher/teacher.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'teacherView', component: TeacherComponent },
  { path: 'islandMap',
    component: IslandMapComponent,
    // children: [
    //   { path: 'initialize/:diff/:oper', component: GameLevelComponent },
    // ]
  },
  { path: 'game/:diff/:oper', component: GameLevelComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' },

];

export const routes = RouterModule.forRoot(appRoutes);
