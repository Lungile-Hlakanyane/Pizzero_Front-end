import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register-service/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class SignUpComponent  implements OnInit {

  fullName: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  physicalAddress: string = '';

  constructor(
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private registerService:RegisterService
  ) { }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.password = this.password === 'password' ? 'text' : 'password';
  }

  signUp() {
    // Step 1: Show the loading spinner with 'Loading...' text
    this.loadingController.create({
      message: 'Loading...',
    }).then(loading => {
      loading.present(); // Show the loading spinner
  
      // Step 2: Call the register service
      const userData = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        physicalAddress: this.physicalAddress
      };
  
      this.registerService.registerUser(userData).subscribe(
        (response: any) => {
            loading.dismiss();
            console.log('User registered successfully:', response);
            this.toastController.create({
                message: response,
                duration: 2000,
                position: 'top',
                color: 'success',
            }).then(toast => {
                toast.present();
            });
            this.router.navigate(['/otp'], {
              queryParams: {email: this.email},
            });
        },
        (error) => {
            loading.dismiss();
            console.error('There was an error during the registration process:', error);
            this.toastController.create({
                message: error.error.message || 'Error registering user. Please try again!',
                duration: 2000,
                position: 'top',
                color: 'danger',
            }).then(toast => {
                toast.present();
            });
        }
     );
    });
  }

  justLogIn(){
    this.router.navigate(['/login']);
  }
  
}
