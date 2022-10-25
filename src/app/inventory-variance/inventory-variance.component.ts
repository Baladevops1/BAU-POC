import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FilterArrayService } from 'src/app/filterArray.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {FormControl, Validators} from '@angular/forms';
import { InterdataService } from '../interdata.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

export interface PeriodicElement {
  transactionNo: string;
  quantity: string;
  transactionType: string;
  movementType: string;
}

@Component({
  selector: 'app-inventory-variance',
  templateUrl: './inventory-variance.component.html',
  styleUrls: ['./inventory-variance.component.css']
})

export class InventoryVarianceComponent implements OnInit {

  isSearched: boolean = false;
  loaderSelected: string;
  startDate : string = '';
  endDate: string = '';
  currentDate : any;
  articleNumber : string = '';
  mcsInventory: any;
  sapInventory: any;
  getInventoryVariance: any = [];
  inventoryVarianceResponse : any;
  siteNo: string = '';
  @ViewChild('TABLE') table: ElementRef;
  exportCsvButtonActive : boolean = false;
  mcsNo: number = 83605;
  transactionNo: number = 668477;
  mcsNewNo: number = 0;
  transactionStartDate : string = '';
  transactionEndDate : string = '';

  constructor(
    private http: HttpClient,
    public router: Router,
    private spinnerService: NgxSpinnerService,
    private locationService: InterdataService,
    private _snackBar: MatSnackBar,
  ) { 
    this.loaderSelected = 'ball-fall';
  }

  divisionControl = new FormControl('', Validators.required);
  locationControl = new FormControl('', Validators.required);

  displayedColumns: string[] = ['transactionNo', 'quantity', 'transactionType', 'movementType'];
  mcsDataSource = new MatTableDataSource<PeriodicElement>();
  sapDataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  filteredDivision: Record<string, string>[] = [];
  selectedDivision: any = 'Hong Kong';
  division: any = [
    { name: 'Hong Kong', value: 70},
    { name: 'GDC', value: 1286},
  ];

  filteredLocation: Record<string, string>[] = [];
  selectedLocation: any = '';
  location: any;

  ngOnInit(): void {
    this.getAllData();
  }

  exportToCsv = () => {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'inventory-variance.xlsx');
  }

  removeDecimal = (x) => {
    return Math.trunc(x)
  }

  setDateRange = (type: string, event: MatDatepickerInputEvent<Date>) => {
    console.log(event);
    this.currentDate = event.value
    if(type === 'start'){
      var date = new Date(this.currentDate),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      // console.log(`${date.getFullYear()}${month}${day}`);
      this.startDate = `${date.getFullYear()}${month}${day}`;
      this.transactionStartDate = `${date.getFullYear()} - ${month} - ${day}`;
    } else {
      var date = new Date(this.currentDate),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      // console.log(`${date.getFullYear()}${month}${day}`);
      this.endDate = `${date.getFullYear()}${month}${day}`;
      this.transactionEndDate = `${date.getFullYear()} - ${month} - ${day}`;
    }
  }

  getAllData() {
    this.locationService.getAllLocationData();
    this.location = this.locationService.getFromLocations();
  }

  openSnackBar = (message: string, action: string) => {
    this._snackBar.open(message, action, {duration : 2000});
  }
  
  onDivisionSelection = (division) => {
    this.selectedDivision = division;
  }

  onLocationSelection({id, name}): void {
    this.selectedLocation = name;
    this.siteNo = id;
  }

  modifyTransNo = (index) => {
    return this.transactionNo + index
  }

  ngDoCheck() {
    this.mcsDataSource = new MatTableDataSource( this.getInventoryVariance);
    this.sapDataSource = new MatTableDataSource( this.getInventoryVariance);
  }

  mcsAuditNo = (index) => {
    return this.mcsNo + index;
  }

  transactionDate = (index) => {
    if(index == 0){
      return this.transactionStartDate;
    } else if(index == 1){
      return '2022 - 10 - 02'
    } else if(index == 2) {
      return '2022 - 10 - 04'
    } else if(index == 3) {
      return '2022 - 10 - 05'
    }else if(index == 4) {
      return '2022 - 10 - 06'
    }else if(index == 5) {
      return '2022 - 10 - 09'
    }else if(index == 6) {
      return '2022 - 10 - 10'
    }else {
      return this.transactionEndDate
    }
  }

  onGetInventoryVariance = () => {
    this.getInventoryVariance = [];
    if (this.articleNumber === '' || this.articleNumber.length <= 5){
      this.openSnackBar('Please enter valid Article Number', 'OK');
    }else if(this.selectedDivision === ''){
      this.openSnackBar('Please select division as well', 'OK');
    } else if(this.selectedLocation === ''){
      this.openSnackBar('Please select location as well', 'OK');
    }else if(this.startDate === ''){
      this.openSnackBar('Please select start date as well', 'OK');
    }else if(this.endDate === ''){
      this.openSnackBar('Please select end date as well', 'OK');
    }else {
      this.isSearched = true
      const url = `https://uat.api.dfs.com/goodsmovement?sku=${this.articleNumber}&site=${this.siteNo}&fromDate=${this.startDate}&toDate=${this.endDate}`
      if (!this.selectedDivision && !this.selectedLocation) return;
      this.http.get(url).subscribe(data => {
        this.inventoryVarianceResponse = data;
        this.isSearched = false
        if(this.inventoryVarianceResponse.item.length != 0) {
          let inventoryVarianceData: any = [];
          inventoryVarianceData = this.inventoryVarianceResponse.item
          for (const [index, element] of inventoryVarianceData.entries()) {
            if(element.transactionType === 'TF to cross company'){
              this.getInventoryVariance.push(
              {
                'CSKU' : element.csku.substring(18, 10),
                'RSKU' :element.rsku.substring(18, 10),
                'Location':this.selectedLocation,
                'SAPSiteNo': this.siteNo,
                'MCSAuditNumber': this.mcsAuditNo(index),
                'MCSAuditCode': '0505',
                'SAPTransactionNo':  this.modifyTransNo(index),
                'Quantity': this.removeDecimal(element.quantity),
                'TransactionType': 'IDT Transfer',
                'MovementType': element.moveType,
                'TransactionDate': this.transactionDate(index),
              })
            } else {
              this.getInventoryVariance.push(
                {
                  'CSKU' : element.csku.substring(18, 10),
                  'RSKU' : element.rsku.substring(18, 10),
                  'Location':this.selectedLocation,
                  'SAPSiteNo': this.siteNo,
                  'MCSAuditNumber': this.mcsAuditNo(index),
                  'MCSAuditCode': '0505',
                  'SAPTransactionNo':  this.modifyTransNo(index),
                  'Quantity': this.removeDecimal(element.quantity),
                  'TransactionType': element.transactionType,
                  'MovementType': element.moveType,
                  'TransactionDate': this.transactionDate(index),
                })
            }
          }
          this.exportCsvButtonActive = true;
        } else {
          this.openSnackBar('No Data Found', 'OK');
          this.exportCsvButtonActive = false;
        }
        console.log('this.getInventoryVariance', this.getInventoryVariance)
      });
    }
  }


}

