import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { LoadingController,ToastController,ModalController,AlertController,ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddCardComponent } from 'src/app/reuseable-components/add-card/add-card.component';
import { CardDTO } from 'src/app/models/Card';
import { Preferences } from '@capacitor/preferences';
import { CardService } from 'src/app/service/card-service/card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule, CommonModule]
})
export class PaymentMethodsComponent  implements OnInit {
  cards:CardDTO[] = [];
  filteredCards: CardDTO[] = [];
  searchQuery: string = '';
  userId!: number;

  constructor(
    private router:Router,
    private modalController: ModalController,
    private loadingController:LoadingController,
    private cardService: CardService,
    private toastController:ToastController,
    private alertController:AlertController,
    private actionSheetController:ActionSheetController
  ) { }

  ngOnInit() {
    this.loadUserCards();
  }

  goBack() {
    this.router.navigateByUrl('/home') 
  }

  async openAddCardModal(card?: CardDTO) {
    const modal = await this.modalController.create({
      component: AddCardComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {
        card: card || {}
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Card details:', data);
      await this.loadUserCards();
    }
  }

  async loadUserCards() {
    const userData = await Preferences.get({ key: 'user' });
    if (userData.value) {
      const user = JSON.parse(userData.value);
      this.userId = user.id;

      const loading = await this.loadingController.create({
        message: 'Loading cards...',
      });
      await loading.present();

      this.cardService.getUserCards(this.userId).subscribe(
        async (response) => {
          this.cards = response;
          this.filteredCards = response;
          await loading.dismiss();
        },
        async (error) => {
          console.error('Error fetching user cards:', error);
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Failed to load cards. Try again!',
            duration: 2000,
            position: 'top',
            color: 'danger',
          });
          await toast.present();
        }
      );
    } else {
      console.error('No user data found in Preferences.');
    }
  }

  async presentActionSheet(card: CardDTO) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Manage Card',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            this.editCard(card);
          },
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.deleteCard(card);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
  
    await actionSheet.present();
  }
  
  async editCard(card: CardDTO) {
    await this.openAddCardModal(card);
  }
  
  
  async deleteCard(card: CardDTO) {
    console.log('Deleting card with ID:', card.id);
    if (card.id === undefined) { 
      console.error('Error: Card ID is undefined!');
      return;
    }
  
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete card ending in ${card.cardNumber.slice(-4)}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            this.cardService.deleteCard(card.id as number).subscribe( 
              async () => {
                this.cards = this.cards.filter(c => c.id !== card.id);
                const toast = await this.toastController.create({
                  message: 'Card deleted successfully!',
                  duration: 2000,
                  color: 'success',
                  position: 'top',
                });
                await toast.present();
              },
              async (error) => {
                console.error('Error deleting card:', error);
                const toast = await this.toastController.create({
                  message: 'Failed to delete card. Try again!',
                  duration: 2000,
                  color: 'danger',
                  position: 'top',
                });
                await toast.present();
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  filterCards() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCards = this.cards.filter(
      (card) =>
        card.cardHolderName.toLowerCase().includes(query) ||
        card.cardNumber.includes(query)
    );
  }
   
}
