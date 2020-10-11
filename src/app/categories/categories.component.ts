import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  btnDisabled: boolean = false;
  newCategory = '';
  categories: any;

  constructor(
    private data: DataService,
    private rest: RestApiService
  ) { }

  async addCategory() {
    this.btnDisabled = true;

    try {
      const data = await this.rest.post('http://localhost:3030/api/categories', { category: this.newCategory })
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message'])
    } catch (err) {
      this.data.error(err['message'])
    }

    this.btnDisabled = false;
  };

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3030/api/categories');
      data['success']
        ? ( this.categories = data['categories'] )
        : this.data.error(data['message'])
    } catch (err) {
      this.data.error(err['message'])
    }
  };

}
