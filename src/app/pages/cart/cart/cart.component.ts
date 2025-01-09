import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class CartComponent  implements OnInit {

  totalItems = 0;
  totalPrice = 0;
  discounts = 0;

  pizzas = [
    { name: 'Pestorazo Pizza', calories: '400g', price: 120.0, quantity: 1, image: '../../../../assets/pizza_01.JPG' },
    { name: 'Veggie Pizza', calories: '350g', price: 100.0, quantity: 1, image: '../../../../assets/pizza_02.JPG' }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private loadingController:LoadingController,
    private router:Router
  ) { }

  ngOnInit() {
    this.calculateTotals();
  }

  increaseQuantity(pizza: any) {
    pizza.quantity++;
    this.calculateTotals();
  }

  decreaseQuantity(pizza: any) {
    if (pizza.quantity > 1) {
      pizza.quantity--;
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.totalItems = this.pizzas.reduce((sum, pizza) => sum + pizza.quantity, 0);
    this.totalPrice = this.pizzas.reduce((sum, pizza) => sum + pizza.price * pizza.quantity, 0);
    this.cdr.detectChanges();
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
