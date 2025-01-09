import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class ForgotPasswordComponent  implements OnInit {

  constructor(
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router
  ) { }

  ngOnInit() {}

  onResetPassword() {
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
          message: 'Password reset email sent successfully',  // Success message
          duration: 2000,                          // Duration of toast (in milliseconds)
          position: 'top',       
          color:'success'                  // Position of the toast (can be 'top', 'bottom', 'middle')
        }).then(toast => {
          toast.present(); // Show the toast
        });
  
        // Step 5: Navigate to the login page
        this.router.navigate(['/otp']);
      }, 3000); // Simulate a delay of 3 seconds (adjust this based on your real logic)
    });
  }

  justRegister(){
    this.router.navigate(['/sign-up'])
  }


}