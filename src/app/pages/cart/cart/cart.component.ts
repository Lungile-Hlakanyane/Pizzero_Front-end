import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';
import { CheckoutService } from 'src/app/service/checkout-service/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class CartComponent  implements OnInit {
  totalItems: number = 0;
  totalPrice: number = 0;
  discounts: number = 0;
  userId: number = 1;
  selectedPizza: any = { id: 11 };

  pizzas: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private loadingController:LoadingController,
    private router:Router,
    private pizzaService:PizzaService,
    private checkoutService:CheckoutService,
    private toastController:ToastController
  ) { }

  ngOnInit() {
   this.fetchCartItemCount();
  }
  
  fetchCartItemCount() {
    this.pizzaService.getUserCartCount(this.userId).subscribe(
      (count) => {
        console.log('Cart count response:', count);
        if (!isNaN(count) && count > 0) {
          this.totalItems = +count;
          console.log('Updated totalItems:', this.totalItems);
          this.fetchCartItems();
        } else {
          console.log('No items in the cart');
          this.totalItems = 0;
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching cart count:', error);
      }
    );
  }

  async fetchCartItems() {
    this.pizzaService.getPizzasInCart(this.userId).subscribe(
      async (pizzas: any[]) => {
        console.log('Fetched pizzas:', pizzas);
        const pizzaDetailsPromises = pizzas.map(async (pizza: any) => {
          const pizzaDetails = await this.pizzaService.getPizzaById(pizza.id).toPromise();
          return { 
            ...pizza, 
            ...pizzaDetails,
            quantity: pizza.quantity ?? 1  
          };
        });
        this.pizzas = await Promise.all(pizzaDetailsPromises);
        this.calculateTotals();
      },
      (error) => {
        console.error('Error fetching pizzas in cart:', error);
      }
    );
  }
  
  
  calculateTotals() {
    this.totalItems = this.pizzas.reduce((sum: number, pizza: any) => {
      const quantity = Number(pizza.quantity) || 0;
      return sum + quantity;
    }, 0);
    this.totalPrice = this.pizzas.reduce((sum: number, pizza: any) => {
      const price = Number(pizza.price) || 0;
      const quantity = Number(pizza.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    this.discounts = this.totalPrice > 100 ? this.totalPrice * 0.1 : 0;
    this.totalPrice = this.totalPrice - this.discounts;
    this.cdr.detectChanges();
  }
  
  increaseQuantity(pizza: any) {
    pizza.quantity++;
    this.calculateTotals();
    this.cdr.detectChanges();
  }

  decreaseQuantity(pizza: any) {
    if (pizza.quantity > 1) {
      pizza.quantity--;
      this.calculateTotals();
    }
  }

  async checkout() {
    const loading = await this.loadingController.create({
      message: 'Checking out...', 
      duration: 3000
    });
    await loading.present();
    const cartData = {
      userId: this.userId, 
      pizzaId: this.selectedPizza?.id ?? this.selectedPizza, 
      totalItems: this.totalItems,
      totalPrice: this.totalPrice,
      discounts: this.discounts
    };
    this.checkoutService.addToCart(cartData).subscribe(
      async () => {
        await loading.dismiss();
        this.showToast('Checkout successful!', 'success');
        this.router.navigate(['/order-review'], {
          queryParams: { 
            pizzaId: cartData.pizzaId, 
            totalItems: cartData.totalItems,
            totalPrice: cartData.totalPrice,
            discounts: cartData.discounts 
          }
        });

      },
      async (error) => {
        await loading.dismiss();
        this.showToast('Checkout failed. Please try again.', 'danger'); 
        console.error('Error saving cart:', error);
      }
    );
  }
  
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top' 
    });
    toast.present();
  }


}
