import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  isCollapsed = true;
  openSubmenu: string | null = null; 


  toggleSubmenu(submenu: string) {
    this.openSubmenu = this.openSubmenu === submenu ? null : submenu;
}

toggleSidebar() {

  this.isCollapsed = !this.isCollapsed;
}

onMouseEnter() {
  this.isCollapsed = false;
}

onMouseLeave() {
  this.isCollapsed = true;
}

}
