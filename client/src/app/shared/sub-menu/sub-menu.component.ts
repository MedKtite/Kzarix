import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss'
})
export class SubMenuComponent implements OnInit {
  @Input() title!: string;
  @Input() link!: string;
  @Input() icon!: string;
  @Input() isOpen = false;
  @Input() isCollapsed = false;
  @Input() marginLeft: string = 'ml-4';
  @Input() routes: string[] = [];
  @Output() toggle = new EventEmitter<void>();

  isActive = false;

  constructor(private router: Router) {}

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
      this.isOpen = true;
    }
  }

  toggleSubmenu() {
    if (!this.isCollapsed) {
      this.isOpen = !this.isOpen;
      this.toggle.emit();
    }
  }
}