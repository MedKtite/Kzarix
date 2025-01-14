import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isSucess: boolean = false;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }


  onSubmit() {
    this.isSucess = true;
  }

}
