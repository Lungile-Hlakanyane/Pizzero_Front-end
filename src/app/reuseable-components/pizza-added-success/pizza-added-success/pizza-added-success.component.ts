import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pizza-added-success',
  templateUrl: './pizza-added-success.component.html',
  styleUrls: ['./pizza-added-success.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PizzaAddedSuccessComponent  implements OnInit {

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }

}
