import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController, ToastController,  } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { OtpServiceService } from 'src/app/service/otp-service/otp-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset-otp',
  templateUrl: './password-reset-otp.component.html',
  styleUrls: ['./password-reset-otp.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true
})
export class PasswordResetOtpComponent  implements OnInit {
  @ViewChild('box1', { static: false }) box1!: IonInput;
  @ViewChild('box2', { static: false }) box2!: IonInput;
  @ViewChild('box3', { static: false }) box3!: IonInput;
  @ViewChild('box4', { static: false }) box4!: IonInput;

  email: string = '';
  otp: string = '';
  userRole:string = 'customer';

  constructor(
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private otpService:OtpServiceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      this.email = params['email'] || 'No Email Provided'
    })
    this.setUserRole('customer');
  }

  onInputChange(event: Event, nextInput: IonInput | null) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
  
    if (typeof inputValue !== 'string' || !/^\d+$/.test(inputValue)) {
      input.value = '';
      return;
    }
  
    if (inputValue && nextInput) {
      nextInput.setFocus();
    } else if (!nextInput) {
      this.onSubmit();
    }
  }

  setUserRole(role:string){
    this.userRole = role;
    console.log(`User role set to ${this.userRole}`);
  }

  async onSubmit() {
    this.otp = `${this.box1.value}${this.box2.value}${this.box3.value}${this.box4.value}`;
    const loading = await this.loadingController.create({
      message: 'Verifying OTP...',
    });
    await loading.present();

    this.otpService.verifyOtp(this.email, this.otp).subscribe(
      async (response) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'OTP Verified Successfully!',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present();
        this.router.navigate(['/new-password'],{
          queryParams: {email: this.email},
        });
      },
      async (error) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Invalid OTP. Please try again.',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      }
    );
  }

  async resendCode() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
  
    await loading.present();
    this.otpService.resendOtp(this.email).subscribe(
      async (response) => {
        // Dismiss the loading controller on success
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'OTP resent successfully!',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present();
        // Navigate to the '/otp' route
        this.router.navigate(['/otp'], { queryParams: { email: this.email } });
      },
      async (error) => {
        // Dismiss the loading controller on error
        await loading.dismiss();
  
        const toast = await this.toastController.create({
          message: 'Failed to resend OTP. Please try again.',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      }
    );
  }
  
}
