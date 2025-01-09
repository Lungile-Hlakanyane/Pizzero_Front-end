import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone:true,
  imports:[IonicModule,FormsModule,CommonModule]
})
export class MenuComponent  implements OnInit {

  activeSection: string = 'all';

  constructor(
    private toastController:ToastController
  ) { }

  ngOnInit() {}

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  async addToCart() {
    const toast = await this.toastController.create({
      message: 'Pizza added to your cart',
      duration: 2000, // Toast will be visible for 2 seconds
      position: 'top', // Displays the toast at the top
      color: 'success', // Gives the toast a green success theme
    });
  
    await toast.present();
  }
  
}
