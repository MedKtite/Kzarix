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
  public productsChartOptions: any;
  public salesChartOptions: any;
  revenueChartOptions: any;
  customersChartOptions: any;
  usersChartOptions: any

  totalRevenue: number = 0;
  newCustomers: number = 0;
  activeUsers: number = 0;
  revenueRate: number = 0;
  customersRate: number = 0;
  usersRate: number = 0;


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

    this.revenueChartOptions = {
      series: [{
        name: 'Revenue',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      chart: {
        type: 'line',
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#16A34A'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    };


    this.customersChartOptions = {
      series: [{
        name: 'New Customers',
        data: [5, 10, 15, 20, 14, 12, 11, 9]
      }],
      chart: {
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#16A34A'], 
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }}

    };





    this.totalRevenue = 5500; 
    this.newCustomers = 120;
    this.activeUsers = 300; 
    this.revenueRate = 2.5; 
    this.customersRate = 4.3; 
    this.usersRate = 78.9; 
  }
}