import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile-image',
  templateUrl: './view-profile-image.component.html',
  styleUrls: ['./view-profile-image.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class ViewProfileImageComponent  implements OnInit {

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss();
  }

}
