import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers:[DatePipe]
})
export class AdminHomeComponent  implements OnInit {

  today = new Date();
  formattedDate!:string;

  constructor(
    private datePipe:DatePipe,
    private router:Router
  ) { }

  ngOnInit() {
    this.formattedDate = this.getFormattedDate();
  }

  getFormattedDate(): string {
    const formattedDate = this.datePipe.transform(this.today, 'EEEE, dd MMMM yyyy');
    return formattedDate ? formattedDate : '';
  }

  navigate(link: any): void {
    this.router.navigateByUrl(link);
  }

}
