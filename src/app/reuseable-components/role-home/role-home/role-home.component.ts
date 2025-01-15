import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from 'src/app/pages/admin-home/admin-home/admin-home.component';


@Component({
  selector: 'app-role-home',
  templateUrl: './role-home.component.html',
  styleUrls: ['./role-home.component.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, AdminHomeComponent]
})
export class RoleHomeComponent  implements OnInit {

  role:any='';

  constructor(
    private router:Router,
    private cdr: ChangeDetectorRef,
    private platform:Platform
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadUserRole();
      this.listenToRoleChanges();
      this.navigateBasedOnRole();
    });
  }

  async getObject() {
    const ret = await Preferences.get({ key: 'user' });
    if (ret.value) {
      const user = JSON.parse(ret.value);
      this.role = user.role; // Return the 'name' property
      this.cdr.detectChanges();
    }else{
      this.router.navigateByUrl("/login");
    }
  }

  async loadUserRole() {
    const ret = await Preferences.get({ key: 'user' });
    if (ret.value) {
      const user = JSON.parse(ret.value);
      this.role = user.role;
      this.cdr.detectChanges();
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  listenToRoleChanges(){

  }

  navigateBasedOnRole() {
    if (this.role === 'admin') {
      this.router.navigateByUrl('/admin-home'); // Navigate to Admin Home
    } else if (this.role === 'customer') {
      this.router.navigateByUrl('/home'); // Navigate to default Home
    } else {
      console.error('Invalid role');
    }
  }

}
