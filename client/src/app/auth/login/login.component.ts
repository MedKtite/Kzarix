import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(library: FaIconLibrary) { 
      library.addIconPacks(fas, fab);
    }

    isPasswordVisible: boolean = false;

    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
}
