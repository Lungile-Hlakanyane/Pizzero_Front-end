import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CustomerRateComponent } from '../customer-rate/customer-rate/customer-rate.component';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class TrackOrderComponent  implements OnInit {

  arrivalTime: string =''; // Holds the dynamic arrival time
  countdownSeconds: number = 60; // Default countdown (60 seconds)

  constructor(
    private router:Router,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.setArrivalTime();
    this.startCountdown();
  }

  goBack(){
    this.router.navigate(['/order-review']);
  }

  setArrivalTime() {
    // Set initial arrival time as current time + 1 minute
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 1);
    this.arrivalTime = this.formatTime(currentTime);
  }

  formatTime(date: Date): string {
    // Format the time as HH:mm AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.countdownSeconds--;
      if (this.countdownSeconds <= 0) {
        clearInterval(interval); // Stop the timer when it reaches 0
        this.showRatingModal(); // Show the modal when the countdown ends
      }
    }, 1000);
  }

  async showRatingModal() {
    const modal = await this.modalController.create({
      component: CustomerRateComponent,
      cssClass: 'bottom-modal-2', 
      backdropDismiss: true, 
    });
    await modal.present();
  }
}
