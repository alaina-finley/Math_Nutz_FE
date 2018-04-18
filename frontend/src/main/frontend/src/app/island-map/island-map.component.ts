import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { GameLevelComponent } from '../game-level/game-level.component'
import { GameProgressService } from '../progress/game-progress.service'
import { Progress } from '../progress/progress';
import { ProgressService } from '../progress/progress.service';
import { UserService } from '../user/users.service';
import { UserComponent } from '../user/user.component';
import { User } from '../user/user';


@Component({
  selector: 'app-island-map',
  templateUrl: './island-map.component.html',
  styleUrls: ['./island-map.component.css']
})
export class IslandMapComponent implements OnInit {
  title = 'Island Map';

  //get progresses from game-progress.service
  gps: GameProgressService;
  progresses: Progress[] = this.gps.getProgress();

  //get users
  us: UserService;
  users: Promise<User[]> = this.us.getUsers();

  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
  }
  
  additionIslandsUnlocked(studentId: number) {
    var unlockedIslands = 0; //0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, and 2 for all three

    var student = this.progresses.find(p => p.student_id == studentId);
    var totalCorrect = student.lev11_correct + student.lev12_correct + student.lev13_correct;

    if (totalCorrect >= 10) {// all questions on island 1 are correct
      unlockedIslands = 1;
    }
    if (totalCorrect >= 20) {// all questions on island 2 are correct
      unlockedIslands = 2;
    }

    return unlockedIslands;
  }

  subtractionIslandsUnlocked(studentId: number) {
    var unlockedIslands = 0; //0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, and 2 for all three

    var student = this.progresses.find(p => p.student_id == studentId);
    var totalCorrect = student.lev21_correct + student.lev22_correct + student.lev23_correct;

    if (totalCorrect >= 10) {// all questions on island 1 are correct
      unlockedIslands = 1;
    }
    if (totalCorrect >= 20) {// all questions on island 2 are correct
      unlockedIslands = 2;
    }

    return unlockedIslands;
  }

  pvIslandsUnlocked(studentId: number) {
    var unlockedIslands = 0; //0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, and 2 for all three

    var student = this.progresses.find(p => p.student_id == studentId);
    var totalCorrect = student.lev31_correct + student.lev32_correct + student.lev33_correct;

    if (totalCorrect >= 10) {// all questions on island 1 are correct
      unlockedIslands = 1;
    }
    if (totalCorrect >= 20) {// all questions on island 2 are correct
      unlockedIslands = 2;
    }

    return unlockedIslands;
  }
}
