import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PaymentSuccessComponent } from 'src/app/reuseable-components/payment-successs/payment-success/payment-success.component';
import { StoreCollectComponent } from 'src/app/reuseable-components/collect -in-store/store-collect/store-collect.component';
import { CheckoutService } from 'src/app/service/checkout-service/checkout.service';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user-service/user.service';
import { CardService } from 'src/app/service/card-service/card.service';
import { CardDTO } from 'src/app/models/Card';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/service/order-service/order.service';


@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class OrderReviewComponent  implements OnInit {
  totalItems: number = 0;
  totalPrice: number = 0;
  discounts: number = 0;
  orderData:any;
  activeSection: string = 'delivery';
  userId: number | null = null;
  id:number = 29; //will be attached here
  userData: User = {} as User;
  userCards: CardDTO[] = [];

  constructor(
    private loadingController:LoadingController,
    private modalController:ModalController,
    private router:Router,
    private checkoutService:CheckoutService,
    private route:ActivatedRoute,
    private pizzaService:PizzaService,
    private userService: UserService,
    private cardService:CardService,
    private orderService:OrderService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getUserId();
    if(this.userId){
      this.fetchUserData();
    }
    this.route.queryParams.subscribe(params => {
      const pizzaId = params['pizzaId'];
      this.totalItems = params['totalItems'] ? Number(params['totalItems']) : 0;
      this.totalPrice = params['totalPrice'] ? Number(params['totalPrice']) : 0;
      this.discounts = params['discounts'] ? Number(params['discounts']) : 0;

      if (pizzaId) {
        this.fetchPizzaDetails(pizzaId);
      } else {
        console.error('No pizzaId found in order data');
      }
    });
  }

  fetchPizzaDetails(pizzaId: number) {
    this.pizzaService.getPizzaById(pizzaId).subscribe(
      (pizzaDetails) => {
        console.log('Fetched pizza details:', pizzaDetails);
        this.orderData = pizzaDetails;
      },
      (error) => {
        console.error('Error fetching pizza details:', error);
      }
    );
  }

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  async placeOrder() {
    const loading = await this.loadingController.create({
      message: 'Loading....',
      duration: 3000,
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const modal = await this.modalController.create({
        component: StoreCollectComponent,
        cssClass: 'bottom-modal', 
        backdropDismiss: true, 
      });
      return await modal.present();
    }, 3000); 
  }
  
  goBack(){
    this.router.navigate(['/cart']);
  }

  async createOrder() {
    if (!this.orderData || !this.userId || !this.id) {
      const toast = await this.toastController.create({
        message: 'Missing required data. Please complete your order.',
        duration: 3000,
        color: 'warning',
        position: 'top',
      });
      await toast.present();
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Placing order...',
    });
    await loading.present();
  
    try {
      // Assign order details
      this.orderData.orderType = this.activeSection;
      this.orderData.userId = this.userId;
      this.orderData.cartId = this.id;
      
      // Ensure total amount is set
      this.calculateTotal();
      this.orderData.totalAmount = this.totalPrice;
  
      // Assign user address and phone number
      this.orderData.customerAddress = this.userData?.physicalAddress || 'No Address Provided';
      this.orderData.customerPhoneNumber = this.userData?.phoneNumber || 'No Phone Number Provided';
  
      console.log('Final Order Data:', this.orderData);
  
      this.orderService.placeOrder(this.orderData).subscribe({
        next: async () => {
          await loading.dismiss();
          const modal = await this.modalController.create({
            component: PaymentSuccessComponent,
            cssClass: 'bottom-modal',
            backdropDismiss: true,
          });
          await modal.present();
        },
        error: async (error) => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Error placing order. Please try again.',
            duration: 3000,
            position: 'top',
            color: 'danger',
          });
          await toast.present();
        },
      });
    } catch (error) {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Unexpected error. Please try again later.',
        duration: 3000,
        color: 'danger',
        position: 'top',
      });
      await toast.present();
      console.error('Unexpected error in createOrder:', error);
    }
  }

  onAddressChange(event: any) {
    const selectedValue = event.detail.value;
    if (selectedValue === 'add-new') {
      this.router.navigate(['/profile']); 
    }
  }

  onPaymentMethodChange(event: any) {
    const selectedValue = event.detail.value;
    if (selectedValue === 'method-4') {
      this.router.navigate(['/payment-methods']);
    }
  }

  async getUserId() {
    const storedUser = await Preferences.get({ key: 'user' });
    if (storedUser.value) {
      const user = JSON.parse(storedUser.value);
      this.userId = user.id;
      this.fetchUserData();
      this.fetchUserCards();
      this.getCartId();
    }
  }

  fetchUserData() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (response: User) => {
          if (response) {
            this.userData = response;
            console.log('User Data:', this.userData);
            console.log('User Address:', this.userData.physicalAddress);
            console.log('User Phone Number:', this.userData.phoneNumber);
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }
  

  fetchUserCards() {
    if (this.userId) {
      this.cardService.getUserCards(this.userId).subscribe(
        (cards: CardDTO[]) => {
          this.userCards = cards;
          console.log('Fetched user cards:', this.userCards);
        },
        (error) => {
          console.error('Error fetching user cards:', error);
        }
      );
    }
  }

  calculateTotal() {
    this.totalPrice = (this.orderData?.price || 0) - this.discounts;
  }

  async getCartId() {
    if (!this.userId) {
      console.error('User ID is null, cannot fetch cart');
      return;
    }
    this.checkoutService.getCart(this.userId).subscribe(
      (cart) => {
        if (cart && cart.id) {
          this.id = cart.id;
        } else {
          console.error('Cart ID is null in response:', cart);
        }
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }
  

}
