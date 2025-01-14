import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
    constructor(library: FaIconLibrary) { 
      library.addIconPacks(fas, fab);
    }

}
