import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public ordersChartOptions: any;
  public usersChartOptions: any;
  public productsChartOptions: any;
  public salesChartOptions: any;

  ngOnInit() {
    this.initializeCharts();
  }

  initializeCharts() {
    this.ordersChartOptions = {
      series: [{
        name: 'Orders',
        data: [65, 59, 80, 81, 56, 55, 40]
      }],
      chart: {
        type: 'line',
        height: 350
      },
      title: {
        text: 'Orders'
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      }
    };

    this.usersChartOptions = {
      series: [{
        name: 'Users',
        data: [28, 48, 40, 19, 86, 27, 90]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Users'
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      }
    };

    this.productsChartOptions = {
      series: [{
        name: 'Views',
        data: [300, 500, 100, 400, 200]
      }],
      chart: {
        type: 'pie',
        height: 350
      },
      title: {
        text: 'Most Viewed Products'
      },
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E']
    };

    this.salesChartOptions = {
      series: [{
        name: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        name: 'Revenue',
        data: [28, 48, 40, 19, 86, 27, 90]
      }],
      chart: {
        type: 'line',
        height: 350
      },
      title: {
        text: 'Sales Report'
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      }
    };
  }
}