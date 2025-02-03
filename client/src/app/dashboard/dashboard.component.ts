import { Component } from '@angular/core';
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";
import { SideBarComponent } from "./layout/side-bar/side-bar.component";
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, RouterModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url === '/dashboard') {
      this.router.navigate(['/dashboard/overview']);
    }
  }

}
