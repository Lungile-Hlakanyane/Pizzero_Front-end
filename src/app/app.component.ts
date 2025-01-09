import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(
    private menuController: MenuController,
    private router: Router,
    private loadingController:LoadingController,
    private toastController:ToastController
  ) {}

  closeMenu() {
    this.menuController.close();
  }

  async logOut() {
    // Show loading spinner with message
    const loading = await this.loadingController.create({
      message: 'Logging out...',// You can use other spinner types like 'lines', 'dots', etc.
      duration: 2000 // Set the duration for the spinner to display (in milliseconds)
    });
    await loading.present();
  
    // Perform logout actions after loading spinner is displayed
    loading.onDidDismiss().then(async () => {
      // Clear user data
      await this.clearData();
      // Navigate to login screen
      await this.router.navigateByUrl("/login");
      // Close the menu
      this.menuController.close();
      // Show success toast message
      const toast = await this.toastController.create({
        message: 'Logout successfully...',
        duration: 2000, // Duration to display the toast (in milliseconds)
        position: 'top', // Position can be 'top', 'middle', or 'bottom'
        color: 'success' // Toast color can be 'primary', 'success', 'warning', etc.
      });
      toast.present();
    });
  }
  
  async clearData() {
    await Preferences.remove({ key: 'user' });
  } 

  navigate(link: any): void {
    this.router.navigateByUrl(link);
    this.menuController.close();
  }
  
}
