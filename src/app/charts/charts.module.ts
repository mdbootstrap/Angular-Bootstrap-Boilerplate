import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule, CardsModule, ButtonsModule, TableModule } from 'angular-bootstrap-md';
import { ChartsComponent } from './containers/charts/charts.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartsRoutingModule } from './charts-routing.module';

import * as fromCharts from './store/charts.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChartsEffects } from './store/charts.effects';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  imports: [
    CommonModule,
    CardsModule,
    ChartsModule,
    ButtonsModule,
    TableModule,
    ChartsRoutingModule,
    StoreModule.forFeature('charts', fromCharts.chartsReducer),
    EffectsModule.forFeature([ChartsEffects])
  ],
  declarations: [ChartsComponent, LineChartComponent, BarChartComponent, DoughnutChartComponent, PieChartComponent],
  exports: [ChartsComponent, LineChartComponent]
})
export class ChartsDataModule { }
