import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class LoginComponent  implements OnInit {

  constructor(
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router
  ) { }

  ngOnInit() {}

  justRegister(){
    this.router.navigate(['/sign-up']);
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password'])
  }

  selectedRole: string = 'customer'; // Default value

  async login() {
    const userRole = this.selectedRole;
  
    // Save the role to Capacitor Preferences
    await Preferences.set({ key: 'user', value: JSON.stringify({ role: userRole }) });
  
    if (userRole === 'admin') {
      this.router.navigateByUrl('/admin-home'); // Navigate to Admin Home
    } else if (userRole === 'customer') {
      this.router.navigateByUrl('/home'); // Navigate to default Home
    } else {
      console.error('Invalid role selected');
    }
  }
  
}
