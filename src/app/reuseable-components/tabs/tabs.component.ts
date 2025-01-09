import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class TabsComponent  implements OnInit {

  selectedTab:string ='';

  constructor() { }

  ngOnInit() {}

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  goHome() {
  }

}
