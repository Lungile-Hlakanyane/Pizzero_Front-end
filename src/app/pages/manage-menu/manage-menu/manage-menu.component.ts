import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController, LoadingController  } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddPizzaModalComponent } from 'src/app/reuseable-components/add-pizza-modal/add-pizza-modal/add-pizza-modal.component';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ManageMenuComponent  implements OnInit {

  constructor(
    private router:Router,
    private actionSheetController:ActionSheetController,
    private modalController:ModalController,
    private alertController:AlertController,
    private toastController:ToastController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {}

  goBack(){
    this.router.navigateByUrl('/admin-home');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.edit();
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.delete();
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

  async edit() {
  //  implementation here
  } 
      

  async delete() {
    // Step 1: Present an alert to confirm deletion
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion cancelled');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            // Step 2: Show loading spinner with message "Deleting..."
            const loading = await this.loadingController.create({
              message: 'Deleting...',
              duration: 2000 // Spinner will last 2 seconds
            });
            await loading.present();
  
            // Simulate the delete operation (e.g., backend API call)
            setTimeout(async () => {
              // Step 3: Dismiss the loading spinner
              await loading.dismiss();
  
              // Step 4: Show success toast
              const toast = await this.toastController.create({
                message: 'Item successfully deleted',
                duration: 2000,
                color: 'success',
                position:'top'
              });
              await toast.present();
            }, 2000); // Matches the loading spinner duration
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  async addPizza(){
    const modal = await this.modalController.create({
      component: AddPizzaModalComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {  },
    });
    await modal.present();
  }

}
