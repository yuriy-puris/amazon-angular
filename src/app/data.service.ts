import { Injectable } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';

import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router, private rest: RestApiService) { 
    this.router.events.subscribe(event => {
      if ( event instanceof NavigationStart ) {
        this.message = '';
      }
    })
  }

  message = '';
  messageType = 'danger';
  user: any;

  error(message) {
    this.messageType = 'danger';
    this.message = message;
  };

  success(message) {
    this.messageType = 'success';
    this.message = message;
  };

  warning(message) {
    this.messageType = 'warning';
    this.message = message;
  };

  async getProfile() {
    try {
      if ( localStorage.getItem('token') ) {
        const data = await this.rest.get('http://localhost:3030/api/account/profile');
        this.user = data['user'];
      }
    } catch (err) {

    }
  }

}
