import { Injectable } from '@angular/core';
import { Store } from './store';
import { Headers, Http } from '@angular/http';
import { StoreService } from './store.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameStoreService {
  stores: Store[];

  constructor(
    private storeService: StoreService,
  ) {}

  isItem1Purchased(student_id: number): boolean {
    const current = (JSON.parse(localStorage.getItem('store'))).find(p => p.student_id === student_id);
    return current.item1_purchased;
  }

  isItem2Purchased(student_id: number): boolean {
    const current = (JSON.parse(localStorage.getItem('store'))).find(p => p.student_id === student_id);
    return current.item2_purchased;
  }

  isItem3Purchased(student_id: number): boolean {
    const current = (JSON.parse(localStorage.getItem('store'))).find(p => p.student_id === student_id);
    return current.item3_purchased;
  }

  isItem4Purchased(student_id: number): boolean {
    const current = (JSON.parse(localStorage.getItem('store'))).find(p => p.student_id === student_id);
    return current.item4_purchased;
  }

  isItem5Purchased(student_id: number): boolean {
    const current = (JSON.parse(localStorage.getItem('store'))).find(p => p.student_id === student_id);
    return current.item5_purchased;
  }

  updateStore(student_id: number, itemNoPurchased: number): void {
    const toBeUpdated = this.stores.find(p => p.student_id === student_id);

    if (itemNoPurchased == 1) {
        toBeUpdated.item1_purchased = true;
    }
    if (itemNoPurchased == 2) {
        toBeUpdated.item2_purchased = true;
    }
    if (itemNoPurchased == 3) {
        toBeUpdated.item3_purchased = true;
    }
    if (itemNoPurchased == 4) {
        toBeUpdated.item4_purchased = true;
    }
    if (itemNoPurchased == 5) {
        toBeUpdated.item5_purchased = true;
    }
    this.storeService.updateStore(toBeUpdated).then(() => localStorage.setItem('store', JSON.stringify(this.stores)));
  }

  instantiateStore(): void {
    // tslint:disable-next-line:max-line-length
    this.storeService.getStore().then(stores => this.stores = stores).then(() => localStorage.setItem('store', JSON.stringify(this.stores)));
  }

}
