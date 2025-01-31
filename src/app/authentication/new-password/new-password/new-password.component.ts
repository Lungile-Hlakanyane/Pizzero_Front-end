import { Component, OnInit } from '@angular/core';
import { IonicModule, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from 'src/app/service/password-service/password.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true,
})
export class NewPasswordComponent  implements OnInit {

  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private route:ActivatedRoute,
    private passwordService:PasswordService,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      this.email = params['email'] || 'No Email Provided'
    })
  }

  async resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.showToast('Passwords do not match!', 'warn');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Updating password...'
    });
    await loading.present();

    this.passwordService.updatePassword(this.email, this.newPassword).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showToast('Password updated successfully!', 'success');
        this.router.navigate(['/login']);
      },
      error: async () => {
        await loading.dismiss();
        this.showToast('Error updating password. Please try again.', 'danger');
      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    toast.present();
  }

}
