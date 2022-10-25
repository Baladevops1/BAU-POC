import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AfterInitiateComponent } from '../after-initiate/after-initiate.component';
import { StockdataService } from '../stockdata.service';
import { StockrecevingdialogComponent } from '../stockrecevingdialog/stockrecevingdialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-stockreceving',
  templateUrl: './stockreceving.component.html',
  styleUrls: ['./stockreceving.component.css'],
})
export class StockrecevingComponent implements OnInit {
  itemsData: any;
  transferIdData: any;
  results: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private stockdataService: StockdataService
  ) {}
  items: any;
  gridData = false;
  randomNumber = Math.floor(Math.random() * 50000 + 1);
  x = this.randomNumber.toString();
  selectedFrom: any;
  selectedTo: any;
  searchTextData: any;
  // fromLocations = [
  //   { name: '203-TST EAST  MAIN SHOP', abbrev: '203' },
  //   { name: '207-CANTON ROAD MAIN SHOP', abbrev: '207' },
  //   { name: '215-TSTE SELECT LITE E-SHOP', abbrev: '215' },
  //   { name: '218-HKG BEST OUTLET', abbrev: '218' },
  //   { name: '229-OCEAN TERMINAL SEAPAX', abbrev: '229' },
  // ];

  // toLocations = [
  //   { name: '203-TST EAST  MAIN SHOP', abbrev: '203' },
  //   { name: '207-CANTON ROAD MAIN SHOP', abbrev: '207' },
  //   { name: '215-TSTE SELECT LITE E-SHOP', abbrev: '215' },
  //   { name: '218-HKG BEST OUTLET', abbrev: '218' },
  //   { name: '229-OCEAN TERMINAL SEAPAX', abbrev: '229' },
  // ];
  fromLocations = [{ name: 'select', abbrev: 'undefined' }];
  toLocations = [{ name: 'select', abbrev: 'undefined' }];
  ngOnInit(): void {
    this.getAllData();
    console.log(
      'this.stockdataService.getStockdatas',
      this.stockdataService.getStockdatas()
    );
  }

  onSubmit(value: any) {
    console.log(value);
    this.searchTextData = value;
    this.searchTextData.id = this.x;
    this.transferIdData = this.searchTextData;
    this.transferIdData.header = 'STOCK TRANSFER RECEVIED SUCCESSFULLY';
    this.transferIdData.actionLbl = 'Please proceed to continue';
    this.transferIdData.idType = 'TRACKING ID';
    this.openDialog();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(StockrecevingdialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.itemsData = result;
      this.items = this.itemsData.gridData;
      this.gridData = true;
      if (result == 'true') {
        this.items = [];
      } else {
        console.log('FINALDATA', this.itemsData.gridData);
      }
    });
  }
  openDialogInit() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.items = result;
    });
  }
  // public _url: string ="assets/stockfiles.json";
  public _url: string = 'https://uat.api.dfs.com/fulllocationmaster';
  getAllData() {
    this.http.get(this._url).subscribe((data) => {
      // Read the result field from the JSON response.
      this.results = data;
      for (let i = 0; i < this.results.LocationMaster.length; i++) {
        if (this.results.LocationMaster[i].SORT1) {
          if (this.results.LocationMaster[i].SORT1.substring(0, 2) == '68') {
            this.toLocations.push({
              abbrev: this.results.LocationMaster[i].SORT1,
              name: this.results.LocationMaster[i].NAME,
            });
          } else if (
            this.results.LocationMaster[i].SORT1.substring(0, 2) == '70'
          ) {
            this.fromLocations.push({
              abbrev: this.results.LocationMaster[i].SORT1,
              name: this.results.LocationMaster[i].NAME,
            });
          }
        }
      }
    });
  }
}
