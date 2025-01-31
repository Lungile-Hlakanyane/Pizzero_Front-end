import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController, LoadingController  } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddPizzaModalComponent } from 'src/app/reuseable-components/add-pizza-modal/add-pizza-modal/add-pizza-modal.component';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ManageMenuComponent  implements OnInit {
  pizzas: any[] = [];
  filteredPizzas: any[] = [];
  searchQuery: string = '';

  constructor(
    private router:Router,
    private actionSheetController:ActionSheetController,
    private modalController:ModalController,
    private alertController:AlertController,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private pizzaService:PizzaService
  ) { }

  ngOnInit() {
    this.loadPizzas();
    this.pizzas = this.pizzas.map(pizza => ({
      ...pizza,
      ingredients: typeof pizza.ingredients === 'string' ? pizza.ingredients.split(',') : pizza.ingredients
    }));
  }

  goBack(){
    this.router.navigateByUrl('/admin-home');
  }

  async presentActionSheet(pizzaId: number) {
    const selectedPizza = this.pizzas.find((pizza) => pizza.id === pizzaId);
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.edit(selectedPizza);
          },
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            this.delete(pizzaId);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
  
  
  async edit(pizza: any) {
    const modal = await this.modalController.create({
      component: AddPizzaModalComponent,
      componentProps: { 
        isEdit: true, 
        pizzaData: pizza 
      },
    });
    await modal.present();
  }
      
  async delete(pizzaId: number) {
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
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            // Step 2: Show loading spinner with message "Deleting..."
            const loading = await this.loadingController.create({
              message: 'Deleting...',
            });
            await loading.present();
  
            // Step 3: Call the deletePizza service
            this.pizzaService.deletePizza(pizzaId).subscribe({
              next: async () => {
                // Step 4: Remove the pizza from the local list
                this.pizzas = this.pizzas.filter((pizza) => pizza.id !== pizzaId);
  
                // Dismiss the loading spinner
                await loading.dismiss();
  
                // Step 5: Show success toast
                const toast = await this.toastController.create({
                  message: 'Pizza successfully deleted',
                  duration: 2000,
                  color: 'success',
                  position: 'top',
                });
                await toast.present();
              },
              error: async (error) => {
                console.error('Error deleting pizza:', error);
  
                // Dismiss the loading spinner
                await loading.dismiss();
  
                // Step 6: Show error toast
                const toast = await this.toastController.create({
                  message: 'Failed to delete pizza',
                  duration: 2000,
                  color: 'danger',
                  position: 'top',
                });
                await toast.present();
              },
            });
          },
        },
      ],
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

  loadPizzas() {
    this.pizzaService.getAllPizzas().subscribe(
      (data) => {
        this.pizzas = data.map(pizza => ({
          ...pizza,
          ingredients: typeof pizza.ingredients === 'string' ? pizza.ingredients.split(',') : pizza.ingredients
        }));
        this.filteredPizzas = [...this.pizzas];
      },
      (error) => {
        console.error('Error fetching pizzas:', error);
      }
    );
  }

  filterPizzas() {
    if (!this.searchQuery) {
      this.filteredPizzas = [...this.pizzas];
    } else {
      this.filteredPizzas = this.pizzas.filter(pizza =>
        pizza.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

}
