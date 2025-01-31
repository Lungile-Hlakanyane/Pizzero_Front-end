import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone:true,
  imports:[IonicModule,FormsModule,CommonModule]
})
export class MenuComponent  implements OnInit {
  pizzas: any[] = [];
  filteredPizzas: any[] = [];
  searchQuery: string = '';
  activeSection: string = 'all';
  totalPizzas: number = 0;
  userId: number = 1; 

  constructor(
    private toastController:ToastController,
    private pizzaService:PizzaService
  ) { }

  ngOnInit() {
    this.loadPizzas();
  }

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  async addToCart(pizzaId: number) {
    this.pizzaService.addToCart(pizzaId, this.userId).subscribe(
      async () => {
        const toast = await this.toastController.create({
          message: 'Pizza added to cart',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present();
        this.loadPizzas();
      },
      (error) => console.error('Error adding to cart:', error)
    );
  }

  removeFromCart(pizzaId: number) {
    this.pizzaService.removeFromCart(pizzaId).subscribe(
      async () => {
        const toast = await this.toastController.create({
          message: 'Pizza removed from cart',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
        this.loadPizzas();
      },
      (error) => console.error('Error removing from cart:', error)
    );
  }

  loadPizzas() {
    this.pizzaService.getAllPizzas().subscribe(
      (data) => {
        this.pizzas = data.map(pizza => ({
          ...pizza,
          ingredients: typeof pizza.ingredients === 'string' ? pizza.ingredients.split(',') : pizza.ingredients,
          toppings: typeof pizza.toppings === 'string' ? pizza.toppings.split(',') : pizza.toppings
        }));
        this.filteredPizzas = [...this.pizzas];
      },
      (error) => {
        console.error('Error fetching pizzas:', error);
      }
    );
  
    // Fetch pizza count from backend
    this.pizzaService.getPizzaCount().subscribe(
      (count) => {
        this.totalPizzas = count;
      },
      (error) => {
        console.error('Error fetching pizza count:', error);
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
