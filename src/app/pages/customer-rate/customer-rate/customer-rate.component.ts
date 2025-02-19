import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { RateService } from 'src/app/service/rate-service/rate.service';

@Component({
  selector: 'app-customer-rate',
  templateUrl: './customer-rate.component.html',
  styleUrls: ['./customer-rate.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CustomerRateComponent  implements OnInit {

  @Input() ratings: {performance: number;} = {performance: 0,};
  
  setRating(category: 'performance',stars: number): void {
    this.ratings[category] = stars;
  }

  getColor(star: number, category: 'performance'): string {
    return star <= this.ratings[category] ? 'orange' : '#777777';
  }

  constructor(
    private modalController:ModalController,
    private router:Router,
    private rateService:RateService,
    private loadingController:LoadingController,
    private toastController:ToastController
  ) { }

  ngOnInit() {}

  async closeModal(){
    await this.modalController.dismiss(()=>{
      this.router.navigateByUrl('/home');
    })
  }

  async submitRating() {
    this.modalController.dismiss();// close the modal first then continue with the rest of the functionalities
    const loading = await this.loadingController.create({
      message: 'Submitting...',
      duration: 2000
    });
    await loading.present();
    const ratingData = { performance: this.ratings.performance };
    this.rateService.submitRating(ratingData).subscribe(
      async (response) => {
        console.log('Rating submitted successfully:', response);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'You have successfully submitted rating',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
        this.closeModal();
      },
      async (error) => {
        console.error('Error submitting rating:', error);
        await loading.dismiss();
        const errorToast = await this.toastController.create({
          message: 'Failed to submit rating. Please try again!',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        await errorToast.present();
      }
    );
  }
  
  

}
