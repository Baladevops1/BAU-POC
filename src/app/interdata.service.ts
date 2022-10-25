import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interdata } from './interdata.interface';

@Injectable({
  providedIn: 'root',
})
export class InterdataService {
  results: any;

  fromLocations = [{ name: 'Select location', abbrev: 'undefined' }];
  filteredFromLocations: Record<string, string>[] = [];

  toLocations = [{ name: 'Select location', abbrev: 'undefined' }];

  gdcLocation: any = 
    { name: 'DFS Group Limited GDC', abbrev: 1286}
  ;

  filteredToLocations: Record<string, string>[] = [];

  interdataList: Interdata[] = [
    {
      id: '',
      toLocation: '',
      fromLocation: '',
      selectedFrom: '',
      toDivision: '',
      shipmentDeliveryDate: '',
      transferInitiatedDate: '',
      reference: '',
      orders: [],
      shipments: [],
      gridData: [],
      rowType: '',
      status: '',
      totalQuantity: '',
      transferQuantity: '',
      totalItem: '',
      ItemDetails: [],
    },
  ];

  orderCreationList: any = [
    {
      id: '',
      toLocation: '',
      fromLocation: '',
      selectedFrom: '',
      toDivision: '',
      shipmentDeliveryDate: '',
      transferInitiatedDate: '',
      reference: '',
      orders: [],
      shipments: [],
      gridData: [],
      rowType: '',
      status: '',
      totalQuantity: 0,
      transferQuantity: 0,
      totalItem: 0,
      ItemDetails: [],
    },
  ];

  constructor(private http: HttpClient) {}

  getStockdatas() {
    return this.interdataList;
  }

  getFromLocations() {
    return this.fromLocations;
  }

  getToLocations() {
    return this.toLocations;
  }

  getToDivisions() {
    return [
      { name: 'Select division', abbrev: 'undefined' },
      { name: 'MACAU', abbrev: 'MACAU' },
      { name: 'NORTH-AMERICA', abbrev: 'NORTH-AMERICA' },
      { name: 'SINGAPORE', abbrev: 'SINGAPORE' },
    ];
  }



  public _url: string = 'https://uat.api.dfs.com/fulllocationmaster';
  getAllLocationData() {
    this.fromLocations = [{ name: 'Select location', abbrev: 'undefined' }];

    this.toLocations = [{ name: 'Select location', abbrev: 'undefined' }];

    this.http.get(this._url).subscribe((data) => {
      this.results = data;
      for (let i = 0; i < this.results.LocationMaster.length; i++) {
        if (this.results.LocationMaster[i].SORT1) {
          if (this.results.LocationMaster[i].SORT1.substring(0, 2) == '68') {
            this.toLocations.push({
              abbrev: this.results.LocationMaster[i].CUSTOMER.substring(1),
              name: this.results.LocationMaster[i].NAME,
            });
          } else if (
            this.results.LocationMaster[i].SORT1.substring(0, 2) == '70'
          ) {
            this.fromLocations.push({
              abbrev: this.results.LocationMaster[i].CUSTOMER.substring(1),
              name: this.results.LocationMaster[i].NAME,
            });
          }
        }
      }
      console.log('this.fromLocations', this.fromLocations);
      this.fromLocations.push(this.gdcLocation);
      console.log('this.fromLocations', this.fromLocations)
    });
  }
}
