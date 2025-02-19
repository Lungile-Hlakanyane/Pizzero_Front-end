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
import { ViewOrderDetailsComponent } from './pages/view-order-details/view-order-details/view-order-details.component';
import { NotificationsComponent } from './pages/notifications/notifications/notifications.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home/admin-home.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders/manage-orders.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu/manage-menu.component';
import { RevenueComponent } from './pages/revenue/revenue/revenue.component';
import { ManageCustomersComponent } from './pages/manage-customers/manage-customers/manage-customers.component';
import { ViewCustomerComponent } from './pages/view-customer/view-customer/view-customer.component';
import { DeliveriesComponent } from './pages/deliveries/deliveries/deliveries.component';
import { PasswordResetOtpComponent } from './authentication/reset-password-otp/password-reset-otp/password-reset-otp.component';
import { NewPasswordComponent } from './authentication/new-password/new-password/new-password.component';
import { authGuard } from './service/authguard/guards/auth.guard';
import { NewScreenComponent } from './new-screen/new-screen/new-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'order-review', component: OrderReviewComponent },
  { path: 'track-order', component: TrackOrderComponent },
  { path: 'view-order-details/:cartId', component: ViewOrderDetailsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'view-customer', component: ViewCustomerComponent },
  { path: 'password-reset-otp', component: PasswordResetOtpComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'new-screen', component: NewScreenComponent },
  {
    path: '',
    component: TabsComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
      { path: 'admin-home', component: AdminHomeComponent, canActivate: [authGuard] },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'payment-methods', component: PaymentMethodsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'cart', component: CartComponent },
      { path: 'build-pizza', component: BuildPizzaComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-menu', component: ManageMenuComponent },
      { path: 'revenue', component: RevenueComponent },
      { path: 'manage-customers', component: ManageCustomersComponent },
      { path: 'deliveries', component: DeliveriesComponent }
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
