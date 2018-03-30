import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainIslandComponent }      from './main-island/main-island.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { GameLevelComponent }      from './game-level/game-level.component';



const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'mainisland', component: MainIslandComponent },
    { path: 'gamelevel', component: GameLevelComponent }
                      ];

//Exporting RouterModule makes router directives available for use in the 
//AppModule components that will need them.
@NgModule( {
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
} )
export class AppRoutingModule {}