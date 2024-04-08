import { Component } from '@angular/core';
import { RestApiServiceService } from '../services/rest-api-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthorizationServiceService } from '../services/authorization-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuItems: any = [];
  signOutBtnVisibility = false;
  isLoggedIn: boolean = false;
  loader: boolean = false;
  username: string = '';

  constructor(public api: RestApiServiceService, public router: Router, public auth: AuthorizationServiceService) {


  }
  ngOnInit(): void {
    this.auth.verifyAdminCredentials().subscribe(res => {
      if (res) {
        this.loader = true;
        this.getMenuItems();
        this.username = res.data.username;
      }
    })

  }

  getMenuItems() {
    this.auth.getAllMenuItems().subscribe(res => {
      if (res) {
        this.menuItems = res;
        this.loader = false;
        this.signOutBtnVisibility = true;
      }
    })
  }

  public signOut() {
    this.api.getData('sign-out', '').then(() => {
      this.menuItems = '';
      this.signOutBtnVisibility = false;
      this.router.navigate(['sign_in']);
    })
  }
}