import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-screen',
  templateUrl: './new-screen.component.html',
  styleUrls: ['./new-screen.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class NewScreenComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  navigate(link: string){
    this.router.navigateByUrl(link);
  }

}
