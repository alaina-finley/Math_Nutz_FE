import { Injectable } from '@angular/core';
import { Store } from './store';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoreService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getStore():  Promise<Store[]> {
    return this.http.get(this.baseUrl + '/api/store/')
      .toPromise()
      .then(response => response.json() as Store[])
      .catch(this.handleError);
  }

  createStore(storeData: Store): Promise<Store> {
    return this.http.post(this.baseUrl + '/api/store/', storeData)
      .toPromise().then(response => response.json() as Store)
      .catch(this.handleError);
  }

  updateStore(storeData: Store): Promise<Store> {
    return this.http.put(this.baseUrl + '/api/store/' + storeData.id, storeData)
      .toPromise()
      .then(response => response.json() as Store)
      .catch(this.handleError);
  }

  deleteStore(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/store/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}