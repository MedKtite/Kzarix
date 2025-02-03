import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SubmenuService } from './sub-menu.service';

@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss'
})
export class SubMenuComponent implements OnInit, OnDestroy {
  @Input() submenuId!: string;
  @Input() title!: string;
  @Input() link!: string;
  @Input() icon!: string;
  @Input() isCollapsed = false;
  @Input() routes: string[] = [];
  @Input() isOpen: boolean = false;
  @Output() toggle = new EventEmitter<void>();



  isActive = false;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private submenuService: SubmenuService
  ) {
    this.subscription = this.submenuService.activeSubmenu$.subscribe(activeMenu => {
      this.isOpen = this.submenuId === activeMenu;
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkActiveRoute(event.url);
    });
  }


  private checkActiveRoute(currentUrl: string): void {
    this.isActive = this.routes.some(route => currentUrl.includes(route));
    if (this.isActive) {
      this.submenuService.setActiveSubmenu(this.submenuId);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}