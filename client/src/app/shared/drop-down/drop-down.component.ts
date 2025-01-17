import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser, faCreditCard, faCog, faLocationArrow, faTools, faSignOutAlt, faChevronDown, faShieldAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  isDropDownVisible = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faUser, faCreditCard, faCog, faLocationArrow, faTools, faSignOutAlt, faChevronDown, faShieldAlt);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isDropDownVisible = false;
    }
  }

  toggleDropdown() {
    this.isDropDownVisible = !this.isDropDownVisible;
  }

}
