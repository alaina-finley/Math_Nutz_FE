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
  ){}

  findCompleted(studentId: number, records: any[], diff: number, oper: number): number{
    var record = records.find(p => p.student_id == studentId);
    if(oper == 0){ //addition question
      if(diff == 5){
        return record.lev11_correct;
      }else if(diff == 50){
        return record.lev12_correct;
      }else{
        return record.lev13_correct;
      }
    }else if(oper == 1){ //subtraction question
      if(diff == 5){
        return record.lev21_correct;
      }else if(diff == 50){
        return record.lev22_correct;
      }else{
        return record.lev23_correct;
      }
    }else if(oper == 2){ //place value question
      if(diff == 5){
        return record.lev31_correct;
      }else if(diff == 50){
        return record.lev32_correct;
      }else{
        return record.lev33_correct;
      }
    }else{
      return record.boss_correct;
    }
  }

  incrementLevTotal(studentId: number, diff: number, oper: number){
    var toBeUpdated = this.progresses.find(p => p.student_id == studentId);
    if(oper == 0){ //addition question
      if(diff == 5){
        toBeUpdated.lev11_total++;
      }else if(diff == 50){
        toBeUpdated.lev12_total++;
      }else{
        toBeUpdated.lev13_total++;
      }
    }else if(oper == 1){ //subtraction question
      if(diff == 5){
        toBeUpdated.lev21_total++;
      }else if(diff == 50){
        toBeUpdated.lev22_total++;
      }else{
        toBeUpdated.lev23_total++;
      }
    }else if(oper == 2){ //place value question
      if(diff == 5){
        toBeUpdated.lev31_total++;
      }else if(diff == 50){
        toBeUpdated.lev32_total++;
      }else{
        toBeUpdated.lev33_total++;
      }
    }else{
      toBeUpdated.boss_total++;
    }
    this.progressService.updateProgress(toBeUpdated).then(progress => console.log(progress));
  }

  incrementLevCorrect(studentId: number, diff: number, oper: number){
    var toBeUpdated = this.progresses.find(p => p.student_id == studentId);
    if(oper == 0){ //addition question
      if(diff == 5){
        toBeUpdated.lev11_correct++;
      }else if(diff == 50){
        toBeUpdated.lev12_correct++;
      }else{
        toBeUpdated.lev13_correct++;
      }
    }else if(oper == 1){ //subtraction question
      if(diff == 5){
        toBeUpdated.lev21_correct++;
      }else if(diff == 50){
        toBeUpdated.lev22_correct++;
      }else{
        toBeUpdated.lev23_correct++;
      }
    }else if(oper == 2){ //place value question
      if(diff == 5){
        toBeUpdated.lev31_correct++;
      }else if(diff == 50){
        toBeUpdated.lev32_correct++;
      }else{
        toBeUpdated.lev33_correct++;
      }
    }else{
      toBeUpdated.boss_correct++;
    }
    this.progressService.updateProgress(toBeUpdated).then(progress => console.log(progress));
  }

  instantiateProgresses(): void {
    this.progressService.getProgresses().then(progresses => this.progresses = progresses).then(() => localStorage.setItem("progresses", JSON.stringify(this.progresses)));
  }

}
