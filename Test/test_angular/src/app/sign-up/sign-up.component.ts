import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { InputValidationsService } from '../services/input-validations.service';
import { RestApiServiceService } from '../services/rest-api-service.service';
import { responseMessage } from '../common/constants';
import { AuthorizationServiceService } from '../services/authorization-service.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, HeaderComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  isFormSubmitted: boolean = false;
  usernameError: string = '';
  form = this.fb.group({
    username: new FormControl(''),
    password: new FormControl('', Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!?@$ %^&*-]).{8,}$/)),

  })

  constructor(private fb: FormBuilder, public validate: InputValidationsService, public router: Router, public http: RestApiServiceService, public auth: AuthorizationServiceService) {
    auth.verifyAdminCredentials().subscribe(res => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }


  signUp() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.http.postData('sign-up', this.form.value).then
        ((res: any) => {
          responseMessage('success', res.message, true);
        },
          error => {
            this.usernameError = error.error.errors.username;
          })
    }
  }
}
