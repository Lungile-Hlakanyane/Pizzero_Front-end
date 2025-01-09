import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class PaymentSuccessComponent  implements OnInit {

  constructor(
    private router:Router,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  async closeModal(){
    this.modalController.dismiss(()=>{
      this.router.navigateByUrl('/home');
    })
  }

  async goHome(){
    await this.modalController.dismiss();
    this.router.navigateByUrl('/home');
  }

  async trackOrder(){
    await this.modalController.dismiss();
    this.router.navigateByUrl('/track-order');
  }

}
