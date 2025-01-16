import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RevenueComponent  implements OnInit {

  activeSection: string = 'today';

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private toastController:ToastController
  ) { }

  ngOnInit() {}

  goBack(){
    this.router.navigateByUrl('/home');
  }

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  async reload() {
    // Step 1: Show the loading spinner
    const loading = await this.loadingController.create({
      message: 'Refreshing...',
      duration: 2000 // Duration for the spinner (2 seconds)
    });
    await loading.present();
  
    // Step 2: Simulate the reload process
    setTimeout(async () => {
      // Dismiss the loading spinner
      await loading.dismiss();
  
      // Step 3: Show the success toast
      const toast = await this.toastController.create({
        message: 'Data has been successfully refreshed.',
        duration: 2000, // Duration of the toast (2 seconds)
        color: 'success',
        position:'top'
      });
      await toast.present();
    }, 2000); // Matches the loading spinner duration
  }
  

}
