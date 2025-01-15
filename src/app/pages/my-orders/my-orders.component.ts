import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  standalone:true,
  imports:[IonicModule, FormsModule]
})
export class MyOrdersComponent  implements OnInit {

  constructor(
    private location:Location,
    private router:Router
  ) { }

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/home') 
  }

  navigateToViewOrderDetails(){
    this.router.navigateByUrl('/view-order-details');
  }

}
