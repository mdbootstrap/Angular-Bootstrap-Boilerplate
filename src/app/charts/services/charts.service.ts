import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {


  constructor(private http: HttpClient) { }
  startDate = '2018-01-01';
  endDate = '2018-01-31';
  apiHistoryUrl = 'https://api.exchangeratesapi.io/history';
  apiLatestUrl = 'https://api.exchangeratesapi.io/latest';

  getExchangeRates(currency: string) {
    return this.http.get(`${this.apiHistoryUrl}?start_at=${this.startDate}&end_at=${this.endDate}&symbols=${currency}`).pipe(
      map( (res: any) => res['rates']),
      switchMap( (val) => {
        const dataset = [];
        for (const rate in val) {
          if (val.hasOwnProperty(rate)) {
            dataset.push({date: rate, value: val[rate][currency] });
          }
        }
        const sorted = dataset.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        });
        const currencyName = currency;
        const labels = sorted.map( data => data.date);
        const values = sorted.map( data => data.value);
        return of({ currencyName, values, labels });
      })
    );
  }

  getLatestExchangeRates() {
    return this.http.get(this.apiLatestUrl).pipe(
      map( (data: any) => {
        const date = data['date'];
        const base = data['base'];
        const rates = data['rates'];
        const dataset = [];

        for (const currency in rates) {
          if (rates.hasOwnProperty(currency)) {
            dataset.push({ currency: currency, value: rates[currency]});
          }
        }

        const values = dataset.map( latestRates => latestRates.value).slice(0, 5);
        const labels = dataset.map( latestRates => latestRates.currency).slice(0, 5);

        return { date, base, values, labels };
      })
    );
  }
}
