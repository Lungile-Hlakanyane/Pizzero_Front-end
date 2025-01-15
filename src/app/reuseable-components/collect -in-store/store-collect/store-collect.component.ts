import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-collect',
  templateUrl: './store-collect.component.html',
  styleUrls: ['./store-collect.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class StoreCollectComponent  implements OnInit {

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

  async goHome(){
    await this.modalController.dismiss();
    this.router.navigateByUrl('/home');
  }

  async checkOrder(){
    await this.modalController.dismiss();
    this.router.navigateByUrl('/my-orders');
  }

}
