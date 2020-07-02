import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerMessage } from '../models/customer-message';

@Injectable({
  providedIn: 'root',
})
export class CustomerSupportService {
  /********************************************************************************** */
  // This is a mock service, Don't use examples on this page in production code. Some APIs
  //  might be totally fake, and Some business logic usually handled on the server
  //   will be done on this page. This page is designed to give a back mock data.
  /********************************************************************************** */
  constructor() {}

  //This is a fake api call
  sendMessage(form: CustomerMessage): Observable<boolean> {
    return form.name ? of(true) : of(false);
  }
}
