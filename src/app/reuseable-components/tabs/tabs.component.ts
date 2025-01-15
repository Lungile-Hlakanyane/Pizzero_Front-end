import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule, CommonModule]
})
export class TabsComponent implements OnInit {

  selectedTab: string = '';
  role: string = '';

  constructor(
    private router:Router
  ) { }

  async ngOnInit() {
    await this.getUserRole();
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  goHome() {
  }

  async getUserRole() {
    const ret = await Preferences.get({ key: 'user' });
    if (ret.value) {
      const user = JSON.parse(ret.value);
      this.role = user.role; // Set the role
      console.log('User role:', this.role);
    } else {
      console.warn('No user role found, redirecting to login.');
      this.router.navigateByUrl('/login');
    }
  }

}
