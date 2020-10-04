import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { validate } from 'json-schema';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { };

  email = '';
  password = '';
  btnDisabled = false

  validate() {
    if ( this.email ) {
      if ( this.password ) {
        return true;
      } else {
        this.data.error('Password ist not entered');
      }
    } else {
      this.data.error('Email ist not entered');
    }
  };

  async login() {
    this.btnDisabled = true;
    try {
      if ( this.validate() ) {
        const data = await this.rest.post('http://localhost:3030/api/account/login', {
          email: this.email,
          password: this.password,
        });
        if ( data['success'] ) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['/']);
        } else {
          this.data.error(data['message']);        
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  ngOnInit(): void {
  
  };

}
