import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';

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

  pizzas: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private loadingController:LoadingController,
    private router:Router,
    private pizzaService:PizzaService
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
          return { ...pizza, ...pizzaDetails }; 
        });
        this.pizzas = await Promise.all(pizzaDetailsPromises);
        this.totalItems = this.pizzas.length;
        this.calculateTotals();
      },
      (error) => {
        console.error('Error fetching pizzas in cart:', error);
      }
    );
  }
  
  calculateTotals() {
    this.totalItems = this.pizzas.reduce((sum: number, pizza: { quantity: number; }) => sum + pizza.quantity, 0);
    this.totalPrice = this.pizzas.reduce((sum: number, pizza: { price: number; quantity: number; }) => sum + pizza.price * pizza.quantity, 0);

    // Apply discount (example logic, you can adjust based on your needs)
    this.discounts = this.totalPrice > 100 ? this.totalPrice * 0.1 : 0; // Apply 10% discount for orders over 100
    this.totalPrice -= this.discounts;

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
      message: 'Loading...',
      duration: 2000 
    });

    await loading.present();
    loading.onDidDismiss().then(() => {
      this.router.navigate(['/order-review']);
    });
  }

}
