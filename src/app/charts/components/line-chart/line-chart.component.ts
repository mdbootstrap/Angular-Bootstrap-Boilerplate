import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit {
  @Input() dataset: any;
  @Input() labels: any;

  public chartType = 'line';

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 152, 0, .5)',
      borderColor: 'rgb(230,81,0)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit() {
  }
}
