import { Component, HostListener } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCog, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DropDownComponent } from "../../../shared/drop-down/drop-down.component";
import { SidebarService } from '../side-bar/side-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule ,DropDownComponent, FontAwesomeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isCollapsed = false;
  isNotificationDropdownOpen = false;
  notifications = [
    'New message from John',
    'Reminder: Meeting at 3 PM',
    'You have 5 new emails',
  ];

  constructor(library: FaIconLibrary, private sidebarService: SidebarService) {
    library.addIcons(faUser, faCog, faBell, faChevronDown);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
 

  

  toggleNotificationDropdown() {
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
  }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-container')) {
        this.isNotificationDropdownOpen = false;
      }
    }
}
