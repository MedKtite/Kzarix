import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubMenuComponent } from '../../../shared/sub-menu/sub-menu.component';
import { SubmenuService } from '../../../shared/sub-menu/sub-menu.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, SubMenuComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  isCollapsed = false;
  openSubmenu: string | null = null;

  constructor(
    private router: Router,
    private submenuService: SubmenuService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isCollapsed) {
        this.submenuService.setActiveSubmenu(null);
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.submenuService.setActiveSubmenu(null);
    }

  }

  toggleProductsSubmenu(): void {
    this.openSubmenu = this.openSubmenu === 'products' ? null : 'products';
  }

  toggleMarketingSubmenu(): void {
    this.openSubmenu = this.openSubmenu === 'marketing' ? null : 'marketing';
  }

  toggleCustomersSubmenu(): void {
    this.openSubmenu = this.openSubmenu === 'customers' ? null : 'customers';
  }
  toggleSettingsSubmenu(): void {

    this.openSubmenu = this.openSubmenu === 'settings' ? null : 'settings';
  }

  isSubmenuOpen(menuId: string): boolean {
    return this.openSubmenu === menuId;
  }

}