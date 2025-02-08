import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../auth/auth.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  isDropDownVisible = false;

  constructor(
    private authService: AuthService,
    private router: Router
  )
   {
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  } 

}
