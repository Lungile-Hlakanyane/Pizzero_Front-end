import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController,LoadingController,ToastController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CardDTO } from 'src/app/models/Card';
import { CardService } from 'src/app/service/card-service/card.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule]
})
export class AddCardComponent  implements OnInit {
  @Input() cardData: CardDTO = { userId: '',cardNumber: '', expirationDate: '', cvv: '', cardHolderName: '' }; 

  card: CardDTO = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolderName: '',
    userId: ''
  };

  constructor(
    private modalController:ModalController,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private cardService:CardService
  ) { }

  async ngOnInit() {
    try {
      const userData = await Preferences.get({ key: 'user' }); 
      if (userData.value) {
        const user = JSON.parse(userData.value);
        console.log('Retrieved User Data:', user); 
        this.card.userId = user.id;
      } else {
        console.error('No user data found in Capacitor Preferences.');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }
  
  async closeModal(){
    this.modalController.dismiss(()=>{
      this.router.navigate(['/payment-methods']);
    })
  }

  async addCard() {
      const loading = await this.loadingController.create({
        message: 'Loading...',
      });
      await loading.present();
    
      if (this.card.id) {
        this.cardService.updateCard(this.card.id, this.card).subscribe(
          async (updatedCard) => {
            await loading.dismiss();
            this.showToast('Card updated successfully', 'success');
            this.modalController.dismiss(updatedCard);
          },
          async (error) => {
            await loading.dismiss();
            this.showToast('Error updating card', 'danger');
            console.error('Error updating card:', error);
          }
        );
      } else {
        this.cardService.addCard(this.card).subscribe(
          async (newCard) => {
            await loading.dismiss();
            this.showToast('New card added successfully', 'success');
            this.modalController.dismiss(newCard);
          },
          async (error) => {
            await loading.dismiss();
            this.showToast('Error adding new card', 'danger');
            console.error('Error adding new card:', error);
          }
        );
     }
  }
  

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

}
