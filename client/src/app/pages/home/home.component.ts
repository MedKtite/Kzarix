import { Component } from '@angular/core';
import { TopBarComponent } from "../layout/top-bar/top-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
