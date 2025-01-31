import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { PizzaAddedSuccessComponent } from '../../pizza-added-success/pizza-added-success/pizza-added-success.component';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';

@Component({
  selector: 'app-add-pizza-modal',
  templateUrl: './add-pizza-modal.component.html',
  styleUrls: ['./add-pizza-modal.component.scss'],  
  standalone: true,
  imports: [IonicModule,FormsModule]

})
export class AddPizzaModalComponent  implements OnInit {
  @Input() pizzaData:any;
  @Input() isEdit = false;
  selectedFile: any | null = null;
 
  pizza = {
    name: '',
    size: '',
    description: '',
    category: '',
    crustType: '',
    toppings: '',
    price: '',
    discount: '',
    status: '',
    ingredients: '',
  };

  constructor(
    private router:Router,
    private modalController:ModalController,
    private loadingController:LoadingController,
    private pizzaService:PizzaService
  ) { }

  ngOnInit() {
    if (this.isEdit && this.pizzaData) {
      this.pizza = { ...this.pizzaData };
    }
  }

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

  ionViewWillEnter(){
    if(this.isEdit){
      console.log('Editing pizza: ', this.pizza);
    }
  }

  async save() {
    const pizzaPayload = { ...this.pizza };
    const loading = await this.loadingController.create({
      message: this.isEdit ? 'Updating Pizza...' : 'Adding Pizza...',
      spinner: 'crescent', // Spinner type (optional)
    });
  
    await loading.present(); // Show loading spinner
  
    if (this.isEdit) {
      this.pizzaService.updatePizza(pizzaPayload).subscribe(
        async (response) => {
          console.log('Pizza updated successfully:', response);
          await loading.dismiss(); // Dismiss loading spinner
          await this.showToast('Pizza details successfully edited'); // Show success toast
          this.modalController.dismiss(response); // Close modal
        },
        async (error) => {
          console.error('Error updating pizza:', error);
          await loading.dismiss();
        }
      );
    } else {
      this.pizzaService.addPizza(pizzaPayload, this.selectedFile).subscribe(
        async (response) => {
          console.log('Pizza added successfully:', response);
          await loading.dismiss(); // Dismiss loading spinner
          await this.showSuccessModal(); // Show success modal
        },
        async (error) => {
          console.error('Error adding pizza:', error);
          await loading.dismiss();
        }
      );
    }
  }
  
  async showSuccessModal() {
    const modal = await this.modalController.create({
      component: PizzaAddedSuccessComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {  },
    });
    await modal.present();
  }

  async showToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000; 
    toast.position = 'top'; 
    document.body.appendChild(toast);
    return toast.present();
  }

}
