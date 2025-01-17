import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss'
})
export class SubMenuComponent {

  @Input() title!: string;
  @Input() link!: string;
  @Input() icon!: string; 
  @Input() isOpen = false;
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();

  toggleSubmenu() {
    if (!this.isCollapsed) {
      this.toggle.emit();
    }
  }
}
