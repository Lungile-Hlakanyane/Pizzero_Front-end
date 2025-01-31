import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user-service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers:[DatePipe]
})
export class AdminHomeComponent  implements OnInit {
  userDetails:User | null = null;
  today = new Date();
  formattedDate!:string;
  email: string = '';

  constructor(
    private datePipe:DatePipe,
    private router:Router,
    private userService:UserService,
    private route:ActivatedRoute
  ) { }

  async ngOnInit() {
    this.formattedDate = this.getFormattedDate();
    this.route.queryParams.subscribe((params)=>{
      this.email = params['email'] || 'No Email Provided';
      console.log('Email from queryParams:', this.email);
    })
    await this.loadUserDetails();
  }

  getFormattedDate(): string {
    const formattedDate = this.datePipe.transform(this.today, 'EEEE, dd MMMM yyyy');
    return formattedDate ? formattedDate : '';
  }

  async loadUserDetails() {
    console.log('Fetching user details for email:', this.email);
    const email = this.email || localStorage.getItem('email');
    if (email) {
      this.userService.getUserDetails(email).subscribe({
        next: (data) => {
          this.userDetails = data;
          console.log('User Details Loaded:', data); // Confirm data is loaded
        },
        error: (err) => {
          console.error('Failed to load user details:', err); // Log any errors
        },
      });
    } else {
      console.error('Email not found to fetch user details.');
    }
  }
  
  navigate(link: any): void {
    this.router.navigateByUrl(link);
  }

}
