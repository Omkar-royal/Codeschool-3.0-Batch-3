import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiServiceService } from './rest-api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(public api: RestApiServiceService, public router: Router) { }

  getAllEmployees(pageNumber: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.getData('get-all-employees?page=' + pageNumber, '').then((data: any) => {
        observer.next(data);
        observer.complete();
      }, (err: any) => {
        observer.error();

      });
    })
  }
  viewEmployee(employee_id: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData("get-employee-details-with-salaries", { employee_id }).then((data: any) => {
        observer.next(data);
        observer.complete();
      }, (err) => {
        observer.error();
      });
    })
  }
}