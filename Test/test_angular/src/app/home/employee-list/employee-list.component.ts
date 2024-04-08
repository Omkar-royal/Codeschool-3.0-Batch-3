import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { AuthorizationServiceService } from '../../services/authorization-service.service';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../common/constants';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  //Common variables
  loader: boolean = false;
  imagePath: string = '../../../assets/images/';


  // Task list data source variables
  allEmployees: Employee[] = [];
  employees: Employee[] = [];
  // Search technique  variables
  searchTerm: string = '';
  searchDepartment: string = '';


  //Pagination  variables
  totalPages: any = [];
  pageNumber: number = 1;
  currentPageNumber: number = 1;
  paginationInfo: any = [];




  constructor(private admin: AdminServiceService, public auth: AuthorizationServiceService, public api: RestApiServiceService, public router: Router) {
    auth.verifyAdminCredentials().subscribe(res => {
      this.getallEmployees(this.pageNumber);
    });

  }


  getallEmployees(page: number) {
    this.admin.getAllEmployees(page).subscribe((data: any) => {
      this.allEmployees = data.employees.data;
      this.employees = this.allEmployees;
      console.log(this.employees);
      this.paginationInfo = data.paginationInfo;
      this.loader = true;

    })
  }



  changePage(pageNumber: number): void {
    this.getallEmployees(pageNumber);
  }
  getPageNumbers(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  viewEmployee(employee_id: number) {

    this.router.navigate(['view_employee_details', employee_id]);
  }
  onSearch() {
    if (this.searchDepartment || this.searchTerm) {
      this.employees = this.allEmployees.filter((item: any) =>
        item.fullname.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        item.department.department_name.toLowerCase().includes(this.searchDepartment.toLowerCase())
      );
    } else {
      this.employees = this.allEmployees;
    }
  }
}