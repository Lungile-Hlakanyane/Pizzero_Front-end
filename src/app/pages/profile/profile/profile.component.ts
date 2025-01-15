import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ViewProfileImageComponent } from 'src/app/reuseable-components/view-profile-image/view-profile-image/view-profile-image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class ProfileComponent  implements OnInit {

  constructor(
    private actionSheetCtrl:ActionSheetController,
    private toastController:ToastController,
    private modalController:ModalController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
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

  async viewImage() {
    const modal = await this.modalController.create({
      component: ViewProfileImageComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {  },
    });
    await modal.present();
  } 
      

  async changeImage() {
    
  }

  
  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message
    });
    await loading.present();
    return loading;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position:'top'
    });
    await toast.present();
  }


}
