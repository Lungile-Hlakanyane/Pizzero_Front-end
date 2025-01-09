import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-add-to-card',
  templateUrl: './success-add-to-card.component.html',
  styleUrls: ['./success-add-to-card.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class SuccessAddToCardComponent  implements OnInit {

  constructor(
    private modalController:ModalController,
    private router:Router
  ) { }

  ngOnInit() {}

  async closeModal(){
    this.modalController.dismiss(()=>{
      this.router.navigateByUrl('/home');
    })
  }

  async goToCart(){
    await this.modalController.dismiss();
    this.router.navigateByUrl('/cart');
  }

  async goHome(){
    await this.modalController.dismiss();
    this.router.navigateByUrl('/home');
  }

}
