import { Component, OnInit } from '@angular/core';
import { IonicModule, IonInput } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule,CommonModule,ReactiveFormsModule]
})
export class OtpComponent  implements OnInit {

  constructor(
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router
  ) { }

  ngOnInit() {}

  onSubmit(){
      // Step 1: Show the loading spinner with 'Loading...' text
      this.loadingController.create({
        message: 'Loading...',  // Loading message   // Optional: spinner style (other options available)
      }).then(loading => {
        loading.present(); // Show the loading spinner
    
        // Step 2: Simulate a delay (e.g., network request, processing, etc.)
        setTimeout(() => {
          // Step 3: Dismiss the loading spinner
          loading.dismiss();
    
          // Step 4: Show a success toast
          this.toastController.create({
            message: 'OTP Verified Sucessfully...',  // Success message
            duration: 2000,                          // Duration of toast (in milliseconds)
            position: 'top',       
            color:'success'                  // Position of the toast (can be 'top', 'bottom', 'middle')
          }).then(toast => {
            toast.present(); // Show the toast
          });
    
          // Step 5: Navigate to the login page
          this.router.navigate(['/login']);
        }, 3000); // Simulate a delay of 3 seconds (adjust this based on your real logic)
      });
  }

  resendCode(){

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
  

}
