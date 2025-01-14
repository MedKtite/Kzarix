import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  
  { path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SingUpComponent },
      {path:'verify', component: VerifyComponent},
      {path:'forgot-password', component: ForgetPasswordComponent}
    ]
  }
];