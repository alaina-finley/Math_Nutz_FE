import { Injectable } from '@angular/core';
import { Progress } from './progress';
import { Headers, Http } from '@angular/http';
import { ProgressService } from './progress.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameProgressService {
  progresses: Progress[];

  constructor(
    private progressService: ProgressService,
  ) { }

  getProgress(): Progress[]{
    return this.progresses;
  }

  getAllTotal(studentId: number): number[] {
    var sr = (JSON.parse(localStorage.getItem("progresses"))).find(p => p.student_id == studentId);
    // var sr = this.progresses.find(p => p.student_id == studentId);
    return [sr.lev11_total, sr.lev12_total, sr.lev13_total, sr.lev21_total, sr.lev22_total, sr.lev23_total, sr.lev31_total, sr.lev32_total, sr.lev33_total, sr.boss_total];
  }

  getAllCorrect(studentId: number): number[] {
    var sr = (JSON.parse(localStorage.getItem("progresses"))).find(p => p.student_id == studentId);
    // var sr = this.progresses.find(p => p.student_id == studentId);
    return [sr.lev11_correct, sr.lev12_correct, sr.lev13_correct, sr.lev21_correct, sr.lev22_correct, sr.lev23_correct, sr.lev31_correct, sr.lev32_correct, sr.lev33_correct, sr.boss_correct];
  }

  findCompleted(studentId: number, records: any[], difficulty: number, oper: number): number {
    var record = records.find(p => p.student_id == studentId);
    if (oper == 0) { //addition question
      if (difficulty == 5) {
        return record.lev11_correct;
      } else if (difficulty == 50) {
        return record.lev12_correct;
      } else {
        return record.lev13_correct;
      }
    } else if (oper == 1) { //subtraction question
      if (difficulty == 5) {
        return record.lev21_correct;
      } else if (difficulty == 50) {
        return record.lev22_correct;
      } else {
        return record.lev23_correct;
      }
    } else if (oper == 2) { //place value question
      if (difficulty == 5) {
        return record.lev31_correct;
      } else if (difficulty == 50) {
        return record.lev32_correct;
      } else {
        return record.lev33_correct;
      }
    } else {
      return record.boss_correct;
    }
  }

  incrementLevTotal(studentId: number, difficulty: number, oper: number) {
    var toBeUpdated = this.progresses.find(p => p.student_id == studentId);
    if (oper == 0) { //addition question
      if (difficulty == 5) {
        toBeUpdated.lev11_total++;
      } else if (difficulty == 50) {
        toBeUpdated.lev12_total++;
      } else {
        toBeUpdated.lev13_total++;
      }
    } else if (oper == 1) { //subtraction question
      if (difficulty == 5) {
        toBeUpdated.lev21_total++;
      } else if (difficulty == 50) {
        toBeUpdated.lev22_total++;
      } else {
        toBeUpdated.lev23_total++;
      }
    } else if (oper == 2) { //place value question
      if (difficulty == 5) {
        toBeUpdated.lev31_total++;
      } else if (difficulty == 50) {
        toBeUpdated.lev32_total++;
      } else {
        toBeUpdated.lev33_total++;
      }
    } else {
      toBeUpdated.boss_total++;
    }
    this.progressService.updateProgress(toBeUpdated).then(() => localStorage.setItem("progresses", JSON.stringify(this.progresses)));
  }

  incrementLevCorrect(studentId: number, difficulty: number, oper: number) {
    var toBeUpdated = this.progresses.find(p => p.student_id == studentId);
    if (oper == 0) { //addition question
      if (difficulty == 5) {
        toBeUpdated.lev11_correct++;
        toBeUpdated.lev11_total++;
      } else if (difficulty == 50) {
        toBeUpdated.lev12_correct++;
        toBeUpdated.lev12_total++;
      } else {
        toBeUpdated.lev13_correct++;
        toBeUpdated.lev13_total++;
      }
    } else if (oper == 1) { //subtraction question
      if (difficulty == 5) {
        toBeUpdated.lev21_correct++;
        toBeUpdated.lev21_total++;
      } else if (difficulty == 50) {
        toBeUpdated.lev22_correct++;
        toBeUpdated.lev22_total++;
      } else {
        toBeUpdated.lev23_correct++;
        toBeUpdated.lev23_total++;
      }
    } else if (oper == 2) { //place value question
      if (difficulty == 5) {
        toBeUpdated.lev31_correct++;
        toBeUpdated.lev31_total++;
      } else if (difficulty == 50) {
        toBeUpdated.lev32_correct++;
        toBeUpdated.lev32_total++;
      } else {
        toBeUpdated.lev33_correct++;
        toBeUpdated.lev33_total++;
      }
    } else {
      toBeUpdated.boss_correct++;
      toBeUpdated.boss_total++;
    }
    this.progressService.updateProgress(toBeUpdated).then(() => localStorage.setItem("progresses", JSON.stringify(this.progresses)));
  }

  instantiateProgresses(): void {
    this.progressService.getProgresses().then(progresses => this.progresses = progresses).then(() => localStorage.setItem("progresses", JSON.stringify(this.progresses)));
  }

}
