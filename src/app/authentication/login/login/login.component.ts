import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { LoginService } from 'src/app/service/login-service/login.service';
import { UserDTO } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class LoginComponent  implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private loginService:LoginService,
    private authService:AuthService
  ) { }

  ngOnInit() {}

  justRegister(){
    this.router.navigate(['/sign-up']);
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password'])
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });
    await loading.present();
    this.loginService.login(this.email, this.password).subscribe(
      async (response: UserDTO) => {
        await loading.dismiss();

        if (!response || !response.role || !response.id) {
          this.showToast('Login failed. User not found or role missing!');
          return;
        }

        this.authService.login(response); 
        await Preferences.set({
          key: 'user',
          value: JSON.stringify({
            id: response.id, 
            role: response.role,
            email: response.email,
          }),
        });

        // Navigate based on user role
        console.log('User Logged In:', response);
        if (response.role === 'admin') {
          this.router.navigate(['/admin-home'], { queryParams: { email: this.email } });
        } else if (response.role === 'customer') {
          this.router.navigate(['/home'], { queryParams: { email: this.email } });
        } else {
          this.showToast('Invalid role!');
        }
      },
      async (error) => {
        await loading.dismiss();
        console.error('Login failed:', error);
        this.showToast('Login failed. Please check your credentials!');
      }
    );
  }
  
  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    await toast.present();
  }
  
}
