import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import hk_locations from '../../assets/hk-location.json';
import mo_locations from '../../assets/mo-location.json';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

const Hk_Location = hk_locations.Locations; 
const Mo_Location = mo_locations.Locations;

export interface PeriodicElement {
  transactionNo: string;
  inventory: string;
  transactionType: string;
  movementType: string;
}

@Component({
  selector: 'app-price-lookup',
  templateUrl: './price-lookup.component.html',
  styleUrls: ['./price-lookup.component.css']
})
export class PriceLookupComponent implements OnInit {

  isSearched: boolean = false;
  loaderSelected: string;
  sapPriceLookup: any;
  pimPriceLookup: any;
  mcsPriceLookup: any;
  getPriceLookup: any = [];
  priceLookupResponse : any;
  articleNumber : string = '';
  selectDivision: string = '';
  selectLocation: string = '';
  storeDesc: string = '';
  rskuDesc : any;
  locationNo: string = '';
  @ViewChild('TABLE') table: ElementRef;
  exportCsvButtonActive : boolean = false;

  constructor(
    private http: HttpClient,
    public router: Router,
    private spinnerService: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) { 
    this.loaderSelected = 'ball-fall';
  }

  divisionControl = new FormControl('', Validators.required);
  locationControl = new FormControl('', Validators.required);

  displayedColumns: string[] = ['transactionNo', 'inventory', 'transactionType', 'movementType'];
  selection = new SelectionModel<PeriodicElement>(true, []);

  filteredDivision: Record<string, string>[] = [];
  selectedDivision: any = 'Hong Kong';
  division: any = [
    { name: 'Hong Kong', value: 70},
    { name: 'Macau', value: 68},
  ];

  filteredLocation: Record<string, string>[] = [];
  selectedLocation: any = '';
  location: any = Hk_Location;

  ngOnInit(): void {
  }

  exportToCsv = () => {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'price-lookup.xlsx');
  }
  
  

  openSnackBar = (message: string, action: string) => {
    this._snackBar.open(message, action, {duration : 2000});
  }

  onDivisionSelection = (division) => {
    this.selectDivision = division;
  }

  onLocationSelection({id, name}): void {
    this.selectLocation = name;
    this.locationNo = id;
  }

  onGetPriceLookup = () => {
    this.getPriceLookup = [];
    if (this.articleNumber === '' || this.articleNumber.length <= 5){
      this.openSnackBar('Please enter valid Article Number', 'OK');
    }else if(this.selectDivision === ''){
      this.openSnackBar('Please select division as well', 'OK');
    } else if(this.selectLocation === ''){
      this.openSnackBar('Please select location as well', 'OK');
    }else {
      this.isSearched = true
      const url = `https://uat.api.dfs.com/price?csku=${this.articleNumber}&divisionid=${this.selectDivision}&storeid=${this.locationNo}`
      if (!this.selectDivision && !this.selectLocation) return;
      this.http.get(url).subscribe(data => {
        this.priceLookupResponse = data;
        if(this.priceLookupResponse.getPriceDetailsOutput.results.length != 0) {
          for (let i = 0; i < this.priceLookupResponse.getPriceDetailsOutput.results.length; i++) {
            if(this.priceLookupResponse.getPriceDetailsOutput.results[i].PRO_RETAIL_PRICE !== null){
              this.getPriceLookup.push(
              {
                'PriceType' : 'Promotion',
                'PriceValue' : 10500,
                'PriceCurrency': 'HKD',
                'PCN_No' : 63405,
                'CSKU': this.priceLookupResponse.getPriceDetailsOutput.results[i].CSKU,
                'RSKU' : this.priceLookupResponse.getPriceDetailsOutput.results[i].RSKU,
                'Location':this.selectLocation,
                'startYear': this.priceLookupResponse.getPriceDetailsOutput.results[i].PRO_EFFECTIVE_FROM.substring(0, 4).trim(),
                'startMonth': this.priceLookupResponse.getPriceDetailsOutput.results[i].PRO_EFFECTIVE_FROM.substring(6, 4).trim(),
                'startDay': this.priceLookupResponse.getPriceDetailsOutput.results[i].PRO_EFFECTIVE_FROM.substring(8, 6).trim(),
                'endYear': this.priceLookupResponse.getPriceDetailsOutput.results[i].RRO_EFFECTIVE_TO.substring(0, 4).trim(),
                'endMonth': this.priceLookupResponse.getPriceDetailsOutput.results[i].RRO_EFFECTIVE_TO.substring(6, 4).trim(),
                'endDay': this.priceLookupResponse.getPriceDetailsOutput.results[i].RRO_EFFECTIVE_TO.substring(8, 6).trim(),
              })
            }else if(this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_RETAIL_PRICE !== null) {
              this.getPriceLookup.push(
              {
                'PriceType' : 'Regular',
                'PriceValue' : this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_RETAIL_PRICE,
                'PriceCurrency': 'HKD',
                'PCN_No' : 63005,
                'CSKU': this.priceLookupResponse.getPriceDetailsOutput.results[i].CSKU,
                'RSKU' : this.priceLookupResponse.getPriceDetailsOutput.results[i].RSKU,
                'Location':this.selectLocation,
                'startYear': this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_EFFECTIVE_FROM.substring(0, 4).trim(),
                'startMonth': this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_EFFECTIVE_FROM.substring(6, 4).trim(),
                'startDay': this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_EFFECTIVE_FROM.substring(8, 6).trim(),
                'endYear': this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_EFFECTIVE_TO.substring(0, 4).trim(),
                'endMonth': this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_EFFECTIVE_TO.substring(6, 4).trim(),
                'endDay': this.priceLookupResponse.getPriceDetailsOutput.results[i].REG_EFFECTIVE_TO.substring(8, 6).trim(),
              })
            }
            break;
          }
          this.getPriceLookup.push({
            'PriceType' : 'Promotion',
            'PriceValue' : 10500,
            'PriceCurrency': 'HKD',
            'PCN_No' : 63405,
            'CSKU': this.priceLookupResponse.getPriceDetailsOutput.results[0].CSKU,
            'RSKU' : this.priceLookupResponse.getPriceDetailsOutput.results[0].RSKU,
            'Location':this.selectLocation,
            'startYear': '2022',
            'startMonth': '10',
            'startDay': '01',
            'endYear': '2022',
            'endMonth': '12',
            'endDay': '31',
          })
          this.exportCsvButtonActive = true;
        } else {
          this.openSnackBar('No Data Found', 'OK');
          this.exportCsvButtonActive = false;
        }
        
        this.isSearched = false
        this.storeDesc = this.getPriceLookup[0].SKU_DESC;
        this.rskuDesc = this.getPriceLookup[0].RSKU;
        console.log('this.getPriceLookup', this.getPriceLookup)
      });
    }
  }

}
