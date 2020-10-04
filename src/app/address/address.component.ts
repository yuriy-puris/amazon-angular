import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  btnDisabled = false;
  currentAddress: any;

  constructor(public data: DataService, private rest: RestApiService) { }

  async updateAddress() {
    this.btnDisabled = true;

    try {
      const res = await this.rest.post(
        'http://localhost:3030/api/account/address',
        this.currentAddress
      );
      res['success']
        ? (this.data.success(res['message']), await this.data.getProfile())
        : this.data.error(res['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    
    this.btnDisabled = false;
  };

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        'http://localhost:3030/api/account/address'
      );
      if ( JSON.stringify(data['address']) === '{}' && this.data.message === '' ) {
        this.data.warning('You have not enetered your shipping address. Please enter your shipping address.')
      }
      this.currentAddress = data['address'];
    } catch (error) {
      this.data.error(error['message']);
    }
  };

}
