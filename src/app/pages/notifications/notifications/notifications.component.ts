import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class NotificationsComponent  implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  goBack(){
    this.router.navigateByUrl('/home');
  }

}
