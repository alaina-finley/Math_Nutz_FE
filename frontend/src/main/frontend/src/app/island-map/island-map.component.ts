import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../login/authentication.service";
import { GameLevelComponent } from "../game-level/game-level.component";
import { GameProgressService } from "../progress/game-progress.service";
import { Progress } from "../progress/progress";
import { ProgressService } from "../progress/progress.service";
import { UserService } from "../user/users.service";
import { UserComponent } from "../user/user.component";
import { User } from "../user/user";

@Component({
  selector: "app-island-map",
  templateUrl: "./island-map.component.html",
  styleUrls: ["./island-map.component.css"]
})
export class IslandMapComponent implements OnInit {
  title = "Island Map";

  //get progresses from game-progress.service
  //gps: GameProgressService;
  //progresses: Progress[] = this.gps.getProgress();

  //get users
  // us: UserService;
  //users: Promise<User[]> = this.us.getUsers();

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }

  /**
   * Returns 0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, 2 for all three, and 3 for when all islands are completed
   */
  additionIslandsUnlocked() {
    var unlockedIslands = 0; // return value
    var us_id = JSON.parse(localStorage.getItem("user")).id;
    var student = JSON.parse(localStorage.getItem("progresses")).find(
      p => p.student_id == us_id
    );
    var totalCorrect =
      student.lev11_correct + student.lev12_correct + student.lev13_correct;

    if (totalCorrect >= 10) {
      unlockedIslands = 1; // all questions on island 1 are correct
    }
    if (totalCorrect >= 20) {
      unlockedIslands = 2; // all questions on island 2 are correct
    }
    if (totalCorrect >= 30) {
      unlockedIslands = 3; // all islands are completed
    }

    return unlockedIslands;
  }

  /**
   * Returns 0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, 2 for all three, and 3 for when all islands are completed
   */
  subtractionIslandsUnlocked() {
    var unlockedIslands = 0; //0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, and 2 for all three
    var us_id = JSON.parse(localStorage.getItem("user")).id;
    var student = JSON.parse(localStorage.getItem("progresses")).find(
      p => p.student_id == us_id
    );
    var totalCorrect =
      student.lev21_correct + student.lev22_correct + student.lev23_correct;

    if (totalCorrect >= 10) {
      unlockedIslands = 1; // all questions on island 1 are correct
    }
    if (totalCorrect >= 20) {
      unlockedIslands = 2; // all questions on island 2 are correct
    }
    if (totalCorrect >= 30) {
      unlockedIslands = 3; // all islands are completed
    }

    return unlockedIslands;
  }

  /**
   * Returns 0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, 2 for all three, and 3 for when all islands are completed
   */
  pvIslandsUnlocked() {
    var unlockedIslands = 0; //0 if only the first island is unlocked, 1 for the 1st & 2nd unlocked, and 2 for all three

    var us_id = JSON.parse(localStorage.getItem("user")).id;
    var student = JSON.parse(localStorage.getItem("progresses")).find(
      p => p.student_id == us_id
    );
    var totalCorrect =
      student.lev31_correct + student.lev32_correct + student.lev33_correct;

    if (totalCorrect >= 10) {
      unlockedIslands = 1; // all questions on island 1 are correct
    }
    if (totalCorrect >= 20) {
      unlockedIslands = 2; // all questions on island 2 are correct
    }
    if (totalCorrect >= 30) {
      unlockedIslands = 3; // all islands are completed
    }
    return unlockedIslands;
  }

  isBossIslandUnlocked() {
    if (
      this.pvIslandsUnlocked() === 3 &&
      this.subtractionIslandsUnlocked() === 3 &&
      this.additionIslandsUnlocked() === 3
    )
      return true;
    else return false;
  }
}
