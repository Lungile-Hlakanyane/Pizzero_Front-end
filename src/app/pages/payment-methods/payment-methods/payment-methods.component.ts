import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class PaymentMethodsComponent  implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/home') 
  }


}
