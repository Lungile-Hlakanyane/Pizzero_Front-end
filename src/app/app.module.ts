import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import { PaymentSuccessComponent } from './reuseable-components/payment-successs/payment-success/payment-success.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { BuildPizzaComponent } from './pages/build-pizza/build-pizza/build-pizza.component';
import { SuccessAddToCardComponent } from './reuseable-components/success-add-to-card/success-add-to-card.component';
import { AddCardComponent } from './reuseable-components/add-card/add-card.component';
import { ViewProfileImageComponent } from './reuseable-components/view-profile-image/view-profile-image/view-profile-image.component';
import { ViewOrderDetailsComponent } from './pages/view-order-details/view-order-details/view-order-details.component';
import { NotificationsComponent } from './pages/notifications/notifications/notifications.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home/admin-home.component';
import { RoleHomeComponent } from './reuseable-components/role-home/role-home/role-home.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders/manage-orders.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu/manage-menu.component';
import { AddPizzaModalComponent } from './reuseable-components/add-pizza-modal/add-pizza-modal/add-pizza-modal.component';
import { PizzaAddedSuccessComponent } from './reuseable-components/pizza-added-success/pizza-added-success/pizza-added-success.component';
import { RevenueComponent } from './pages/revenue/revenue/revenue.component';
import { ManageCustomersComponent } from './pages/manage-customers/manage-customers/manage-customers.component';
import { ViewCustomerComponent } from './pages/view-customer/view-customer/view-customer.component';
import { DeliveriesComponent } from './pages/deliveries/deliveries/deliveries.component';
import { CustomerRateComponent } from './pages/customer-rate/customer-rate/customer-rate.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SignUpComponent,
    LoginComponent, ForgotPasswordComponent, OtpComponent,TabsComponent, MyOrdersComponent,
    PaymentMethodsComponent,ProfileComponent, MenuComponent, CartComponent, OrderReviewComponent, 
    PaymentSuccessComponent, TrackOrderComponent, BuildPizzaComponent, SuccessAddToCardComponent, 
    AddCardComponent,ViewOrderDetailsComponent,NotificationsComponent,AdminHomeComponent,RoleHomeComponent,
    ManageOrdersComponent, ManageMenuComponent,AddPizzaModalComponent,PizzaAddedSuccessComponent,RevenueComponent, 
    ManageCustomersComponent, ViewCustomerComponent, DeliveriesComponent, CustomerRateComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
