import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ViewCustomerComponent  implements OnInit {

  activeSection: string = 'payments';

  constructor(
    private router:Router,
    private actionSheetControl:ActionSheetController
  ) { }

  ngOnInit() {}

  goBack(){
    this.router.navigateByUrl('/manage-customers');
  }

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetControl.create({
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
  //  implementation here
  } 
      

  async downloadReport() {
    // implementation here
  }


}
