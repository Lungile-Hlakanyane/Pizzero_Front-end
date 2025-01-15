import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SuccessAddToCardComponent } from 'src/app/reuseable-components/success-add-to-card/success-add-to-card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class BuildPizzaComponent  implements OnInit {

  selectedSize: string = '';
  selectedCrust: string = '';
  selectedSauce: string = '';
  selectedToppings: string[] = [];
  selectedOptions: string[] = [];

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  toggleTopping(topping: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedToppings.push(topping);
    } else {
      const index = this.selectedToppings.indexOf(topping);
      if (index > -1) {
        this.selectedToppings.splice(index, 1);
      }
    }
    console.log('Selected Toppings:', this.selectedToppings);
  }

  async addToCart(){
     // Step 1: Show the loading spinner
     const loading = await this.loadingController.create({
      message: 'Loading....',
      duration: 3000, // Duration for loading spinner (in ms), adjust as needed
    });
    await loading.present();
  
    // Step 2: Simulate a delay (this will be handled automatically by the duration)
    setTimeout(async () => {
      // Step 3: Hide the loading spinner and show the modal
      await loading.dismiss();
  
      // Show the PaymentSuccessComponent modal
      const modal = await this.modalController.create({
        component: SuccessAddToCardComponent,
        cssClass: 'bottom-modal', // Apply the custom CSS class
        backdropDismiss: true,   // Allow dismissal by tapping outside
      });
      return await modal.present();
    }, 3000);
  }

  //new methods here
  onSizeChange(size: string) {
    this.selectedSize = size;
    console.log('Selected Size:', this.selectedSize);
  }


  onCrustChange(selectedCrust: string) {
    if (!this.selectedOptions.includes(selectedCrust)) {
      this.selectedOptions.push(selectedCrust); 
    }
  }

  onSauceChange(selectedSauce: string) {
    if (!this.selectedOptions.includes(selectedSauce)) {
      this.selectedOptions.push(selectedSauce); 
    }
  }

  onToppingsChange(selectedToppings: string[]) {
    this.selectedToppings = selectedToppings;
    console.log('Selected Toppings:', this.selectedToppings);
  }

  // List of available options
  availableOptions: string[] = ['Stuffed crust', 'Onions', 'Cheese', 'Garlic', 'Bacon'];

  // Add an option to the selected list
  addOption(event: any) {
    const selected = event.detail.value;
    if (!this.selectedOptions.includes(selected)) {
      this.selectedOptions.push(selected);
    }
  }

  // Remove an option from the selected list
  removeOption(index: number) {
    this.selectedOptions.splice(index, 1);
  }

  removeTopping(index: number) {
    this.selectedToppings.splice(index, 1);  // Remove topping from the list
  }

}
