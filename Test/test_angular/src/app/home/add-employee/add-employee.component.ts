import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputValidationsService } from '../../services/input-validations.service';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { Router, RouterLink } from '@angular/router';
import { AuthorizationServiceService } from '../../services/authorization-service.service';
import { responseMessage } from '../../common/constants';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],

  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  files: FileList | null = null;
  imageUrl: string = 'https://th.bing.com/th/id/OIP.hmLglIuAaL31MXNFuTGBgAAAAA?rs=1&pid=ImgDetMain';

  loader: boolean = false;
  isFormSubmitted: boolean = false;
  emailError: string = '';
  imageError: string = '';
  profileErrorMessage: string = '';


  form = this.fb.group({
    fullname: new FormControl(''),
    email: new FormControl(''),
    date_of_birth: new FormControl(''),
    employee_image: new FormControl(''),
    gender: new FormControl(''),
    contact_number: new FormControl('', Validators.pattern(/^(?=.*?[0-9]).{10,10}$/)),
    address: new FormControl(''),
    department_id: new FormControl(),
  })

  constructor(private fb: FormBuilder, public validate: InputValidationsService, public router: Router, public http: RestApiServiceService, public auth: AuthorizationServiceService) {
    auth.verifyAdminCredentials().subscribe(res => {
      if (!res) {
        this.router.navigate(['/sign_in']);
      }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.files = event.target.files;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result as string;
        this.form.patchValue({ employee_image: file });
      };
      reader.readAsDataURL(file);
    }
  }
  validateDate(deadline: any) {
    const today = new Date();
    const inputDate = new Date(deadline);
    if (inputDate <= today) {
      return true
    } else {
      responseMessage('error', 'Please select a past date.', true);
      return false;
    }
  }

  addEmployee() {
    this.loader = true;
    this.isFormSubmitted = true;
    const formData = new FormData();
    const dob = this.form.value['date_of_birth'];

    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control instanceof FormControl) {
        formData.append(key, control.value);
      }
    });
    if (this.form.valid && this.validateDate(dob)) {
      this.http.postData('add-employee', formData).then
        ((res: any) => {
          responseMessage('success', res.message, true);
        },
          error => {
            this.emailError = error.error.errors.email;
          })
    }
  }
}
