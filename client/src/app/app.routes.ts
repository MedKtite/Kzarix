import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './dashboard/pages/orders/orders.component';
import { OverviewComponent } from './dashboard/pages/overview/overview.component';
import { AddProductComponent } from './dashboard/pages/products/add-product/add-product.component';
import { CategoryComponent } from './dashboard/pages/products/category/category.component';
import { ProductsComponent } from './dashboard/pages/products/products.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductsListComponent } from './dashboard/pages/products/products-list/products-list.component';
import { ProductFormComponent } from './shared/product-form/product-form.component';
import { SettingsComponent } from './dashboard/pages/settings/settings.component';
import { ProfileComponent } from './dashboard/pages/settings/profile/profile.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'verify', component: VerifyComponent },
      { path: 'forgot-password', component: ForgetPasswordComponent }
    ]
  },
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    {path: 'overview', component: OverviewComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'products', component: ProductsComponent, children: [
      {path: '', component: ProductsListComponent},
      {path: 'add', component: AddProductComponent},
      { path: 'edit/:id', component: ProductFormComponent },
      {path: 'categories', component: CategoryComponent},
  ]},
  {path: 'settings', component: SettingsComponent, children: [
    {path:'profile', component: ProfileComponent},
  ]
  },
  ]
  }

];