import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogcardComponent } from '../dialogcard/dialogcard.component';
import { StockdataService } from '../stockdata.service';
import { Stockdata } from '../stockdata.interface';
import { AfterInitiateComponent } from '../after-initiate/after-initiate.component';
import { StockcompletedataService } from '../stockcompletedata.service';
import { HttpClient } from '@angular/common/http';
import { coerceStringArray } from '@angular/cdk/coercion';



@Component({
  selector: 'app-stocktransfer',
  templateUrl: './stocktransfer.component.html',
  styleUrls: ['./stocktransfer.component.css']
})
export class StocktransferComponent implements OnInit {
  currentDate = new Date();
  randNumber = "5000";
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

  fromLocations = [{ name: 'select', abbrev: 'undefined' }];
  toLocations = [{ name: 'select', abbrev: 'undefined' }];
  // toLocations = [
  //   { name: '203-TST EAST  MAIN SHOP', abbrev: '203' },
  //   { name: '207-CANTON ROAD MAIN SHOP', abbrev: '207' },
  //   { name: '215-TSTE SELECT LITE E-SHOP', abbrev: '215' },
  //   { name: '218-HKG BEST OUTLET', abbrev: '218' },
  //   { name: '229-OCEAN TERMINAL SEAPAX', abbrev: '229' },
  // ];

  items: any;
  transferIdData: any;
  results: any
  toLocation: any;
  fromLocation: any;
  results1: any;
  testData: any;
  ListingDetails: any;
  constructor(private http: HttpClient, private stockcompletedataService: StockcompletedataService, private stockdataService: StockdataService, public dialog: MatDialog, public router: Router) { }

  randomNumber = Math.floor((Math.random() * 50000) + 1);
  x = this.randomNumber.toString();
  ngOnInit(): void {
    this.getAllData();
    this.openStock();
  }

  onSubmit(value: any) {

    if (!value) return;
    this.searchTextData = value;
    this.searchTextData.id = this.x;
    this.transferIdData = this.searchTextData;
    this.transferIdData.header = "STOCK TRANSFER INITIATED SUCCESSFULLY";
    this.transferIdData.actionLbl = "Please proceed to receive";
    this.transferIdData.idType = "TRACKING ID";

    this.http.get("https://uat.api.dfs.com/listing?siteNumber=" + value.fromLocation).subscribe(data => {

      this.results1 = data
      let lastnChars1 = '"1000868"';
      let lastnChars;
      if (this.results1.ListingDetails) {
        for (let i = 0; i <= 100; i++) {
          if (this.results1.ListingDetails[i] && this.results1.ListingDetails[i].ARTNR) {
            if (this.results1.ListingDetails[i].ARTNR.length > 7) {
              lastnChars = this.results1.ListingDetails[i].ARTNR.substring(this.results1.ListingDetails[i].ARTNR.length - 7, this.results1.ListingDetails[i].ARTNR.length);
              lastnChars1 = lastnChars1 + "," + '"' + lastnChars + '"';
            }
          }
        }
      }
      this.http.get("https://uat.api.dfs.com/product?itemNumbers=" + lastnChars1).subscribe(data => {
        this.testData = data;
        if (this.testData.ItemDetails) {

          this.searchTextData.ItemDetails = this.testData.ItemDetails;
          this.openDialog();
        }
      });
    });


  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '1000px',
      data: this.searchTextData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.items = result;
      if (result == "true") {
        this.items = [];
      } else {

      }
    })
  }

  openStock() {
    let dialogRef = this.dialog.open(DialogcardComponent, { width: '400px', height: '200px' },
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
      } else {
        this.router.navigate(['/', 'home']);
      }
    })
  }
  onInitiate() {
    this.searchTextData.gridData = this.items;
    this.stockdataService.stockdataList.push(this.searchTextData)
    this.openDialogInit();
  }

  openDialogInit() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData
    });
    dialogRef.afterClosed().subscribe(result => {
      this.items = result;
    })
  }


  // public _url: string ="assets/stockfiles.json";
  public _url: string = "https://uat.api.dfs.com/fulllocationmaster";
  getAllData() {
    this.http.get(this._url).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      for (let i = 0; i < this.results.LocationMaster.length; i++) {
        if (this.results.LocationMaster[i].SORT1) {
          if (this.results.LocationMaster[i].SORT1.substring(0, 2) == "68") {
            this.toLocations.push({ "abbrev": this.results.LocationMaster[i].CUSTOMER.substring(1), "name": this.results.LocationMaster[i].NAME });
          }
          else if (this.results.LocationMaster[i].SORT1.substring(0, 2) == "70") {
            this.fromLocations.push({ "abbrev": this.results.LocationMaster[i].CUSTOMER.substring(1), "name": this.results.LocationMaster[i].NAME });
          }
        }
      }
    });
  }

}
