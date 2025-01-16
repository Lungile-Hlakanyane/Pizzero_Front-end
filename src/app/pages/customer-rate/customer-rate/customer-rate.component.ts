import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-customer-rate',
  templateUrl: './customer-rate.component.html',
  styleUrls: ['./customer-rate.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CustomerRateComponent  implements OnInit {
  @Input() ratings: {
    performance: number;
    punctuality: number;
    behaviour: number;
    attitude: number;
  } = {
    performance: 0,
    punctuality: 0,
    behaviour: 0,
    attitude: 0
  };
  
  setRating(category: 'performance' | 'punctuality' | 'behaviour' | 'attitude', stars: number): void {
    this.ratings[category] = stars;
  }

  getColor(star: number, category: 'performance' | 'punctuality' | 'behaviour' | 'attitude'): string {
    return star <= this.ratings[category] ? 'orange' : '#777777';
  }

  constructor(
    private modalController:ModalController,
    private router:Router
  ) { }

  ngOnInit() {}

  async closeModal(){
    await this.modalController.dismiss(()=>{
      this.router.navigateByUrl('/home');
    })
  }

}
