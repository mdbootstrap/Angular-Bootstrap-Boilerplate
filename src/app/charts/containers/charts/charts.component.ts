import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';

import * as fromCharts from './../../store/charts.actions';
import { Subscription, Observable } from 'rxjs';
import { getLineChartData, getBarChartData, getIsLoading } from '../../store/charts.selectors';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  lineChartSub: Subscription;
  barChartSub: Subscription;

  dataset: any[] = [{ data: [], label: ''}];
  labels: any[] = [];

  barChartDataset: any[] = [{ data: [], label: '' }];
  barChartLabels: any[] = [];
  barChartDate: string;
  barChartBase: string;

  currency: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.lineChartSub = this.store.select(getLineChartData).subscribe( (data: any) => {
      if (data.values) {
        this.dataset = [{ data: data.values, label: `${data.currencyName} exchange rates (base EUR)`}];
        this.labels = data.labels;
      } else {
        this.getExchangeRates('USD');
      }
    });

    this.barChartSub = this.store.select(getBarChartData).subscribe( (data: any) => {
      if (data.values) {
        this.barChartDataset = [{ data: data.values, label: `${data.date} exchange rates (base ${data.base})`}];
        this.barChartLabels = data.labels;
      } else {
        this.getLatestExchangeRates();
      }
    });


  }

  getExchangeRates(currency: string) {
    this.store.dispatch(new fromCharts.LineChartQuery({ currency }));
  }

  getLatestExchangeRates() {
    this.store.dispatch(new fromCharts.BarChartQuery());
  }

  ngOnDestroy() {
    if (this.lineChartSub) {
      this.lineChartSub.unsubscribe();
    }

    if (this.barChartSub) {
      this.barChartSub.unsubscribe();
    }
  }

}
