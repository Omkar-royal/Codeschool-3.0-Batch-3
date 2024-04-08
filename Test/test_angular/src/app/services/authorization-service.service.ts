import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestApiServiceService } from './rest-api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationServiceService {

  constructor(public api: RestApiServiceService, public router: Router) { }

  verifyAdminCredentials(): Observable<any> {
    return new Observable<boolean>((observer) => {
      if (localStorage.getItem("token") !== null) {
        this.api.getData('get-admin-details', '').then((data: any) => {
          observer.next(data);
          observer.complete();
        }, (error) => {
          console.error("Error during authentication:", error);
          observer.next(false);
          observer.complete();
        });
      } else {
        localStorage.clear();
        observer.next(false);
        observer.complete();
      }
    });
  }
  getAllMenuItems(): Observable<any> {
    return new Observable<{ status: boolean, message: string, data?: any }>((observer) => {
      this.api.getData('get-menus', '').then((res: any) => {
        observer.next(res.data);

      })
    })
  }

}
