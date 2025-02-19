import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Order } from 'src/app/models/Order';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';
import { OrderService } from 'src/app/service/order-service/order.service';
import { CheckoutService } from 'src/app/service/checkout-service/checkout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule, CommonModule]
})
export class ViewOrderDetailsComponent  implements OnInit {
  order: Order | null = null;
  pizzaDetails: any;
  cartId!: number;

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private actionSheetCtr:ActionSheetController,
    private route:ActivatedRoute,
    private orderService:OrderService,
    private pizzaService:PizzaService,
    private checkoutService:CheckoutService
  ) { }

  ngOnInit() {
    this.cartId = Number(this.route.snapshot.paramMap.get('cartId'));
    console.log('Cart ID:', this.cartId);

    if (this.cartId) {
      this.getCartDetails(this.cartId);
    }
  }
  
  goBack() {
    this.router.navigate(['/my-orders']);
  }
  
  async navigateToTrackOrder() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
    });

    await loading.present(); 
    setTimeout(() => {
      loading.dismiss(); 
      this.router.navigateByUrl('/track-order'); 
    }, 2000); 
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtr.create({
      header: 'Actions',
      buttons: [{
        text: 'Downloadd',
        icon: 'download-outline',
        handler: () => {
          this.downloadProofOfPayment();
        }
      }, {
        text: 'View Reciept',
        icon: 'document-text-outline',
        handler: () => {
          this.viewPop();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  downloadProofOfPayment(){
    // Implementation here...
  }

  viewPop(){
    // Implementation here...
  }

  getCartDetails(cartId: number) {
    this.checkoutService.getCartByCartId(cartId).subscribe(
      (cart) => {
        if (cart && cart.pizza) { 
          this.pizzaDetails = cart.pizza; 
        } else {
          console.error('No pizza details found for this cart');
        }
      },
      (error) => {
        console.error('Error fetching cart details', error);
      }
    );
  }
  

  getPizzaDetails(pizzaId: number) {
  this.pizzaService.getPizzaById(pizzaId).subscribe(
    (pizza) => {
      this.pizzaDetails = pizza;
    },
    (error) => {
      console.error('Error fetching pizza details', error);
    }
  );
}

}
