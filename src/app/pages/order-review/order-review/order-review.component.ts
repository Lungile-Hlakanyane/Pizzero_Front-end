import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PaymentSuccessComponent } from 'src/app/reuseable-components/payment-successs/payment-success/payment-success.component';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class OrderReviewComponent  implements OnInit {

  activeSection: string = 'delivery';

  constructor(
    private loadingController:LoadingController,
    private modalController:ModalController,
    private router:Router
  ) { }

  ngOnInit() {}

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  async placeOrder() {
    // Step 1: Show the loading spinner
    const loading = await this.loadingController.create({
      message: 'Loading....',
      duration: 3000, // Duration for loading spinner (in ms), adjust as needed
    });
    await loading.present();
  
    // Step 2: Simulate a delay (this will be handled automatically by the duration)
    setTimeout(async () => {
      // Step 3: Hide the loading spinner and show the modal
      await loading.dismiss();
  
      // Show the PaymentSuccessComponent modal
      const modal = await this.modalController.create({
        component: PaymentSuccessComponent,
        cssClass: 'bottom-modal', // Apply the custom CSS class
        backdropDismiss: true,   // Allow dismissal by tapping outside
      });
      return await modal.present();
    }, 3000); // Delay after which the modal is shown (adjust as needed)
  }
  
  goBack(){
    this.router.navigate(['/cart']);
  }

}
