import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ManageOrdersComponent  implements OnInit {

  activeSection: string = 'today';

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  constructor(
    private router:Router,
    private actionSheetController:ActionSheetController
  ) { }

  ngOnInit() {}

  goBack(){
    this.router.navigateByUrl('/admin-home');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'View Report',
        icon: 'document-text-outline',
        handler: () => {
          this.viewReport();
        }
      }, {
        text: 'Download Report',
        icon: 'download-outline',
        handler: () => {
          this.downloadReport();
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

  async viewReport() {
   // implementation here 
  } 
      

  async downloadReport() {
    // implementation here
  }


}
