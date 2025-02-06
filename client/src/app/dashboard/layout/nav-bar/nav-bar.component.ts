import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCog, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DropDownComponent } from "../../../shared/drop-down/drop-down.component";
import { SidebarService } from '../side-bar/side-bar.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DropDownComponent, FontAwesomeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isCollapsed = false;

  constructor(library: FaIconLibrary, private sidebarService: SidebarService) {
    library.addIcons(faUser, faCog, faBell, faChevronDown);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
