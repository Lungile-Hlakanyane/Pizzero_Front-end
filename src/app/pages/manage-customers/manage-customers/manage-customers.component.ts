import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ManageCustomersComponent  implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  activeSection: string = 'today';

  showSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  goBack(){
    this.router.navigateByUrl('/admin-home');
  }

  viewCustomer(){
    this.router.navigateByUrl('/view-customer')
  }
}
