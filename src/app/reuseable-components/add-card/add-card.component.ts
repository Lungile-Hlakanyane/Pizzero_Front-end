import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController,LoadingController,ToastController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule]
})
export class AddCardComponent  implements OnInit {

  constructor(
    private modalController:ModalController,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router
  ) { }

  ngOnInit() {}

  async closeModal(){
    this.modalController.dismiss(()=>{
      this.router.navigate(['/payment-methods']);
    })
  }

  async addCard() {

    //close the modal
    this.closeModal();

    // Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Adding a Card...',
      duration: 3000, // Spinner will disappear after 3 seconds
    });
    await loading.present();

    // Simulate card addition logic
    setTimeout(async () => {
      // Dismiss loading spinner
      await loading.dismiss();

      // Show toast message
      const toast = await this.toastController.create({
        message: 'A card was successfully added.',
        duration: 2000, // Toast will disappear after 2 seconds
        position: 'top', // Display at the top
        color: 'success', // Optional: Customize color
      });
      await toast.present();
    }, 3000); // Simulate the delay of card processing (matches loading duration)
  }

}
