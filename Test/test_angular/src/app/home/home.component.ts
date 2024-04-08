import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthorizationServiceService } from '../services/authorization-service.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loader: boolean = true;

  constructor(public router: Router, public auth: AuthorizationServiceService) {
    auth.verifyAdminCredentials().subscribe(res => {
      this.loader = false;
      if (!res) {
        this.router.navigate(['sign_in']);
      } else {
        this.loader = true;
      }
    });
  }
}
