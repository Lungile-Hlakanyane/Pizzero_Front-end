import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from 'src/app/service/pizza-service/pizza.service';

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
  totalPizzas: number = 0;
  pizzas: any[] = [];
  filteredPizzas: any[] = [];
  customerCount:number = 0;

  constructor(
    private datePipe:DatePipe,
    private router:Router,
    private userService:UserService,
    private route:ActivatedRoute,
    private pizzaService:PizzaService
  ) { }

  async ngOnInit() {
    this.loadPizzas();
    this.formattedDate = this.getFormattedDate();
    this.route.queryParams.subscribe((params)=>{
      this.email = params['email'] || 'No Email Provided';
      console.log('Email from queryParams:', this.email);
    })
    await this.loadUserDetails();
    await this.loadCustomerCount();
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


  async loadPizzas() {
    this.pizzaService.getAllPizzas().subscribe(
      (data) => {
        this.pizzas = data.map(pizza => ({
          ...pizza,
          ingredients: typeof pizza.ingredients === 'string' ? pizza.ingredients.split(',') : pizza.ingredients,
          toppings: typeof pizza.toppings === 'string' ? pizza.toppings.split(',') : pizza.toppings
        }));
        this.filteredPizzas = [...this.pizzas];
      },
      (error) => {
        console.error('Error fetching pizzas:', error);
      }
    );
  
    // Fetch pizza count from backend
    this.pizzaService.getPizzaCount().subscribe(
      (count) => {
        this.totalPizzas = count;
      },
      (error) => {
        console.error('Error fetching pizza count:', error);
      }
    );
  }

  async loadCustomerCount() {
    this.userService.getCustomerCount().subscribe({
      next: (count) => {
        this.customerCount = count;
      },
      error: (err) => {
        console.error('Failed to load customer count:', err);
      },
    });
  }


}
