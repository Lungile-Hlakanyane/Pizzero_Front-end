import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
  standalone:true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class TrackOrderComponent  implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  goBack(){
    this.router.navigate(['/order-review']);
  }
}
