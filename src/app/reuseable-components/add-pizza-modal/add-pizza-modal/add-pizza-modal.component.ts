import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { PizzaAddedSuccessComponent } from '../../pizza-added-success/pizza-added-success/pizza-added-success.component';

@Component({
  selector: 'app-add-pizza-modal',
  templateUrl: './add-pizza-modal.component.html',
  styleUrls: ['./add-pizza-modal.component.scss'],  
  standalone: true,
  imports: [IonicModule,FormsModule]

})
export class AddPizzaModalComponent  implements OnInit {
  selectedFile: File | null = null;

  constructor(
    private router:Router,
    private modalController:ModalController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  async save() {
    await this.dismiss();
    
    const loading = await this.loadingController.create({
      message: 'Saving...',
      duration: 2000, 
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const modal = await this.modalController.create({
        component: PizzaAddedSuccessComponent, 
        cssClass: 'bottom-modal', 
        backdropDismiss: true,
      });
      await modal.present();
    }, 2000);
  }

}
