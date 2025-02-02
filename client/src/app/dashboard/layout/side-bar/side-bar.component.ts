import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubMenuComponent } from '../../../shared/sub-menu/sub-menu.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, SubMenuComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  isCollapsed = false;
  openSubmenu: string | null = null;

  constructor(private router: Router) {}

  toggleSubmenu(submenu: string) {
    this.openSubmenu = this.openSubmenu === submenu ? null : submenu;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}