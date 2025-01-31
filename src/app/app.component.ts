import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  role: string = '';

  constructor(
    private menuController: MenuController,
    private router: Router,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private alertController:AlertController
  ) {
    this.getUserRole();
  }

  async ngOnInit() {
    if (this.router.url !== '/otp') {
      await this.getUserRole();
    }
  }


  closeMenu() {
    this.menuController.close();
  }

  async logOut() {
    await this.closeMenu();
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout canceled');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
           
            const loading = await this.loadingController.create({
              message: 'Logging out...',
              duration: 2000 
            });
            await loading.present();
  
            loading.onDidDismiss().then(async () => {
            
              await this.clearData();
              
              await this.router.navigateByUrl("/login");
             
              this.menuController.close();
              
              const toast = await this.toastController.create({
                message: 'Logout successfully...',
                duration: 2000,
                position: 'top', 
                color: 'success'
              });
              toast.present();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async clearData() {
    await Preferences.remove({ key: 'user' });
  } 

  navigate(link: any): void {
    this.router.navigateByUrl(link);
    this.menuController.close();
  }

  async getUserRole() {
    const currentRoute = this.router.url; // Get the current route
    const ret = await Preferences.get({ key: 'user' });
  
    if (ret.value) {
      const user = JSON.parse(ret.value);
      this.role = user.role; // Set the role
      console.log('User role:', this.role);
    } else if (currentRoute !== '/otp') {
      // Only redirect if not on the /otp route
      console.warn('No user role found, redirecting to login.');
      this.router.navigateByUrl('/login');
    }
  }
  
}
