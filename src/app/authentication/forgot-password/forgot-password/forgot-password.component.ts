import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OtpServiceService } from 'src/app/service/otp-service/otp-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class ForgotPasswordComponent  implements OnInit {

  email: string = '';
  otp: string = '';
  newPassword: string = '';

  constructor(
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private otpService:OtpServiceService
  ) { }

  ngOnInit() {}

  async onResetPassword() {
    const loading = await this.loadingController.create({ message: 'Sending OTP...' });
    await loading.present();
    this.otpService.sendOtp(this.email).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'OTP sent to your email.',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present().then(()=>{
          this.router.navigate(['/password-reset-otp'],{
            queryParams: {email: this.email}
          })
        });
      },
      error: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Failed to send OTP.',
          duration: 2000,
          color: 'danger',
          position:'top'
        });
        toast.present();
      }
    });
  }

  async onVerifyOtp() {
    const loading = await this.loadingController.create({ message: 'Verifying OTP...' });
    await loading.present();
    this.otpService.verifyOtp(this.email, this.otp).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'OTP verified successfully.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      },
      error: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Invalid OTP.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  async onUpdatePassword() {
    const loading = await this.loadingController.create({ message: 'Updating password...' });
    await loading.present();
    this.otpService.updatePassword(this.email, this.newPassword).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Password updated successfully.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.router.navigate(['/login']);
      },
      error: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Failed to update password.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  justRegister(){
    this.router.navigate(['/sign-up'])
  }


}
