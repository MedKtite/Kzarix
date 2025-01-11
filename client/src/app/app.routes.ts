import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent },
    ]
  }
];