import { Component } from '@angular/core';
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";
import { SideBarComponent } from "./layout/side-bar/side-bar.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, RouterModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
