import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddCardComponent } from 'src/app/reuseable-components/add-card/add-card.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class PaymentMethodsComponent  implements OnInit {

  constructor(
    private router:Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/home') 
  }

  async openAddCardModal() {
    const modal = await this.modalController.create({
      component: AddCardComponent, 
      cssClass: 'bottom-modal',
      backdropDismiss: true
    });

    // Present the modal
    await modal.present();

    // Handle modal dismissal
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Card details:', data); // Log the card details returned by the modal
    }
  }

}
