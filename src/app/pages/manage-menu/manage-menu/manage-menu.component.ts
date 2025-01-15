import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
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
    private modalController:ModalController
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
    // implementation here
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
