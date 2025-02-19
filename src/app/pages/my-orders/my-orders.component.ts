import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order-service/order.service';
import { Preferences } from '@capacitor/preferences';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule, CommonModule]
})
export class MyOrdersComponent  implements OnInit {

  orders: Order[] = [];
  userId: number | null = null;
  isLoading = true;

  constructor(
    private location:Location,
    private router:Router,
    private orderService:OrderService,
    private toastController:ToastController,
    private loadingController:LoadingController
  ) { }

  async ngOnInit() {
    await this.loadUserOrders();
  }

  goBack() {
    this.router.navigateByUrl('/home') 
  }

  navigateToViewOrderDetails(cartId: number) {
    this.router.navigate(['/view-order-details', cartId]);
  }
  
  
  async loadUserOrders() {
    try {
      const storedUser = await Preferences.get({ key: 'user' });
      if (storedUser.value) {
        const userData = JSON.parse(storedUser.value);
        this.userId = userData.id;

        if (this.userId) {
          const loading = await this.loadingController.create({ message: 'Loading Orders...' });
          await loading.present();

          this.orderService.getUserOrders(this.userId).subscribe({
            next: (orders) => {
              this.orders = orders;
              this.isLoading = false;
              loading.dismiss();
            },
            error: async (err) => {
              console.error('Error fetching orders:', err);
              this.isLoading = false;
              loading.dismiss();
              const toast = await this.toastController.create({
                message: 'Failed to load orders. Try again later!',
                duration: 3000,
                color: 'danger',
                position: 'top'
              });
              await toast.present();
            }
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

}
