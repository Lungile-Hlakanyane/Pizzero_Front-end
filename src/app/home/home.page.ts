import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    private toastController:ToastController,
    private actionSheetCtr:ActionSheetController
  ) {}

  async addToCart() {
    const toast = await this.toastController.create({
      message: 'Pizza added to your cart',
      duration: 2000, 
      position: 'top', 
      color: 'success',
    });
  
    await toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtr.create({
      header: 'Actions',
      buttons: [{
        text: 'View Image',
        icon: 'eye',
        handler: () => {
          this.viewImage();
        }
      }, {
        text: 'Change Image',
        icon: 'camera',
        handler: () => {
          this.changeImage();
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

  changeImage(){
    // implementation here
  }

  viewImage(){
    // implementation here
  }
}
