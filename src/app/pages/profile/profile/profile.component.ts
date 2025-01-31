import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { ActivatedRoute, } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ViewProfileImageComponent } from 'src/app/reuseable-components/view-profile-image/view-profile-image/view-profile-image.component';
import { UserService } from 'src/app/service/user-service/user.service';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule, CommonModule]
})
export class ProfileComponent  implements OnInit {

  userId: number | null = null;
  userData: User = {} as User;

  email: string = '';

  constructor(
    private actionSheetCtrl:ActionSheetController,
    private toastController:ToastController,
    private modalController:ModalController,
    private loadingController:LoadingController,
    private userService:UserService,
    private route:ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getUserId();
    if(this.userId){
      this.fetchUserData();
    }
  }
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [{
        text: 'View Image',
        icon: 'eye',
        handler: () => {
          this.viewImage();
        }
      }, {
        text: 'Change Image',
        icon: 'camera',
        handler: () => {
          this.changeImage();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async viewImage() {
    const modal = await this.modalController.create({
      component: ViewProfileImageComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {  },
    });
    await modal.present();
  } 
      
  async changeImage() {
    // implementation here
  }

  
  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message
    });
    await loading.present();
    return loading;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position:'top'
    });
    await toast.present();
  }

   // Get user ID from local storage
   async getUserId() {
    const storedUser = await Preferences.get({ key: 'user' });
    if (storedUser.value) {
      const user = JSON.parse(storedUser.value);
      this.userId = user.id;
      console.log('User ID retrieved:', this.userId);
    }
  }

  fetchUserData() {
    this.userService.getUserById(this.userId!).subscribe(
      (response: User) => {
        this.userData = { ...response };
        console.log('User Data:', this.userData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  async updateUserProfile() {
    if (!this.userId) {
      this.presentToast('User ID not found!', 'danger');
      return;
    }
    const loading = await this.presentLoading('Updating...');
    this.userService.updateUser(this.userId, this.userData).subscribe(
      async (response) => {
        setTimeout(async () => {
          await loading.dismiss();
          this.presentToast('User profile updated successfully...', 'success');
          this.fetchUserData(); // Re-fetch updated data
        }, 2000); // Wait for 2 seconds before showing success message
      },
      async (error) => {
        await loading.dismiss();
        this.presentToast('Failed to update profile', 'danger');
        console.error('Update Error:', error);
      }
    );
  }
  
  
}
