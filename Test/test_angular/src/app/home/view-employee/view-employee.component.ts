import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationServiceService } from '../../services/authorization-service.service';
import { DatePipe } from '@angular/common';
import { Deduction, Earning, Employee, Salary } from '../../common/constants';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent {
  loader: boolean = true;
  employee_id: number = 0;
  employee: any = [];
  imagePath: string = '../../../assets/images/';
  salaries: Salary[] = [];
  earnings: Earning[] = [];
  deductions: Deduction[] = [];
  paySlip: any = [];
  constructor(private admin: AdminServiceService, private router: Router, private route: ActivatedRoute, public auth: AuthorizationServiceService) {
    this.route.params.subscribe(params => {
      this.loader = false;
      this.employee_id = params['employee_id'];
    });
    this.auth.verifyAdminCredentials().subscribe(res => {
      if (res) {
        this.viewEmployee(this.employee_id);
      }
    })

  }


  viewEmployee(employee_id: number) {
    console.log(employee_id)
    this.admin.viewEmployee(employee_id).subscribe((res: any) => {
      if (res.data !== "Unauthorized") {
        this.employee = res.employee;
        this.salaries = res.employee.salaries;
        this.loader = true;

      } else {
        this.router.navigate([''])
      }
    })
  }
  viewPayslip(salaryIndex: number) {
    this.paySlip = this.salaries[salaryIndex];
    this.earnings = this.employee.earning;
    this.deductions = this.employee.deduction;


  }
}
