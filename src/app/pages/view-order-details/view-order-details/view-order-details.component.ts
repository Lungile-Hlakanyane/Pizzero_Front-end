import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class ViewOrderDetailsComponent  implements OnInit {

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private actionSheetCtr:ActionSheetController
  ) { }

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/my-orders') 
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


}
