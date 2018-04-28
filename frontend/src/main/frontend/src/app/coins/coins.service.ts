import { Injectable } from '@angular/core';
import { Coin } from './coin';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CoinService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getCoins():  Promise<Coin[]> {
    return this.http.get(this.baseUrl + '/api/coins/')
      .toPromise()
      .then(response => response.json() as Coin[])
      .catch(this.handleError);
  }

  createCoin(coinsData: Coin): Promise<Coin> {
    return this.http.post(this.baseUrl + '/api/coins/', coinsData)
      .toPromise().then(response => response.json() as Coin)
      .catch(this.handleError);
  }

  updateCoin(coinsData: Coin): Promise<Coin> {
    return this.http.put(this.baseUrl + '/api/coins/' + coinsData.id, coinsData)
      .toPromise()
      .then(response => response.json() as Coin)
      .catch(this.handleError);
  }

  deleteCoin(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/coins/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
