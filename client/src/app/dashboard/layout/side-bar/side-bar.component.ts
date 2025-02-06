import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubMenuComponent } from '../../../shared/sub-menu/sub-menu.component';
import { SubmenuService } from '../../../shared/sub-menu/sub-menu.service';
import { filter } from 'rxjs';
import { SidebarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  isCollapsed = false;
  openSubmenu: string | null = null;
  isProductsSubmenuOpen = false;
  isMarketingSubmenuOpen = false;
  isReportsSubmenuOpen = false;
  isSettingsSubmenuOpen = false;

  constructor(
    private router: Router,
    private submenuService: SubmenuService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isCollapsed) {
        this.submenuService.setActiveSubmenu(null);
      }
    });
    this.sidebarService.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.submenuService.setActiveSubmenu(null);
    }

  }
  toggleProductsSubmenu(): void {
    this.isProductsSubmenuOpen = !this.isProductsSubmenuOpen;
  }

  toggleMarketingSubmenu(): void {
    this.isMarketingSubmenuOpen = !this.isMarketingSubmenuOpen;
  }
  toggleReportsSubmenu(): void {
    this.isReportsSubmenuOpen = !this.isReportsSubmenuOpen;
  }
  toggleSettingsSubmenu (): void {
    this.isSettingsSubmenuOpen = !this.isSettingsSubmenuOpen;
  }

  isSubmenuOpen(menuId: string): boolean {
    return this.openSubmenu === menuId;
  }

}