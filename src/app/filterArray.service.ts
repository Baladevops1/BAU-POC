import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterArrayService {
  constructor(private http: HttpClient) {}

  filterArray: any = {
    gender: [],
    brands: [],
    subClass: [],
    defined: [],
    continents: [],
    countries: [],
    search: '',
  };

  mapItem: any = {};

  productLookupData: any;
  productDetails: any;
  pimUpc: any;
  sapUpc: any;
  attributeDetails: any;

  getFilterArray() {
    return this.filterArray;
  }
}
