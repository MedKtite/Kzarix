import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCog, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DropDownComponent } from "../../../shared/drop-down/drop-down.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DropDownComponent, FontAwesomeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(library: FaIconLibrary) {
    library.addIcons(faUser, faCog, faBell, faChevronDown);
  }
}
