import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './authentication/sign-up/sign-up/sign-up.component';
import { LoginComponent } from './authentication/login/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password/forgot-password.component';
import { OtpComponent } from './authentication/otp/otp/otp.component';
import { TabsComponent } from './reuseable-components/tabs/tabs.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods/payment-methods.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { MenuComponent } from './pages/menu/menu/menu.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { OrderReviewComponent } from './pages/order-review/order-review/order-review.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { BuildPizzaComponent } from './pages/build-pizza/build-pizza/build-pizza.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'order-review', component:OrderReviewComponent},
  { path: 'track-order', component:TrackOrderComponent},
  {
    path: '',
    component: TabsComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'my-orders',component:MyOrdersComponent},
      { path: 'payment-methods',component:PaymentMethodsComponent},
      { path: 'profile',component:ProfileComponent},
      { path: 'menu', component:MenuComponent},
      { path: 'cart', component:CartComponent},
      { path: 'build-pizza', component:BuildPizzaComponent}
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
