import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  constructor(library: FaIconLibrary) { 
    library.addIconPacks(fas, fab);
  }
  isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
