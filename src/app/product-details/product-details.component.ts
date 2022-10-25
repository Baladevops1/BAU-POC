import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { FilterArrayService } from 'src/app/filterArray.service';
import { HttpClient } from '@angular/common/http';
import hk_locations from '../../assets/hk-location.json';
import mo_locations from '../../assets/mo-location.json';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {OpenDialogComponent} from '../open-dialog/open-dialog.component';
import {MatTabChangeEvent} from '@angular/material/tabs';

const Hk_Location = hk_locations.Locations; 
const Mo_Location = mo_locations.Locations;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private fa: FilterArrayService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  mcsDivisionControl = new FormControl('', Validators.required);
  mcsLocationControl = new FormControl('', Validators.required);
  posLocationControl = new FormControl('', Validators.required);
  posDivisionControl = new FormControl('', Validators.required);
  vendorDivisionControl = new FormControl('', Validators.required);
  listingDivisionControl = new FormControl('', Validators.required);
  

  color: any  = '#BF2F1A';
  singleProduct: any;
  singleSapUPC: any;
  singlePimUPC: any;
  attributeData: any;

  mcsDivisionSelection: any = '';
  mcsLocationSelection: any = '';
  mcsUpcData: any;
  mcsUpcResponseData: any = [];

  posDivisionSelection: any = '';
  posLocationSelection: any = '';
  posUpcData: any = [];
  posUpcResponseData: any = [];

  vendorDivSelection: any = '';
  vendorLocationSelection: any = '';
  vendorData: any;
  vendorResponseData: any = [
    {
      articleNumber: '42482380',
      location : '1322',
      mcsLocation: '87',
      startDate: '2022-10-15',
      endDate : '9999-12-31',
      vendorCurrencyCode: 'HK',
      vendorUnitCost: '400.00',
      VendorUnitOfMeasure: 'EA ',
      VendorUnitOfMeasureQty: 1
    },
    // {
    //   articleNumber: '42482380',
    //   location : '1322',
    //   mcsLocation: '87',
    //   startDate: '2022-10-19',
    //   endDate : '2022-10-12',
    //   vendorCurrencyCode: 'HK',
    //   vendorUnitCost: '400.00',
    //   VendorUnitOfMeasure: 'EA ',
    //   VendorUnitOfMeasureQty: 1
    // }
  ];

  listingDivSelection: any = '';
  listingLocationSelection: any = '';
  listingData: any;
  listingResponseData: any = [
    {
      articleNumber: '42482380',
      location : '1338',
      mcsLocation: '203',
      startDate: '2022-10-15',
      endDate : '2022-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },
    {
      articleNumber: '42482380',
      location : '1322',
      mcsLocation: '87',
      startDate: '2019-07-18',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },
    {
      articleNumber: '42482380',
      location : '1662',
      mcsLocation: '86',
      startDate: '2017-09-26',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },
    {
      articleNumber: '42482380',
      location : '1979',
      mcsLocation: '23',
      startDate: '2019-07-19',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },

    {
      articleNumber: '42482380',
      location : '1721',
      mcsLocation: '302',
      startDate: '2017-09-26',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },
    {
      articleNumber: '42482380',
      location : '1347',
      mcsLocation: '257',
      startDate: '2022-01-28',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },
    {
      articleNumber: '42482380',
      location : '2246',
      mcsLocation: '214',
      startDate: '2017-09-26',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },
    {
      articleNumber: '42482380',
      location : '1339',
      mcsLocation: '207',
      startDate: '2020-06-04',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    },
    {
      articleNumber: '42482380',
      location : '1360',
      mcsLocation: '357',
      startDate: '2019-07-27',
      endDate : '9999-12-31',
      sapStatus: 'A',
      mcsStatus: 'A',
    }
  ];

  filteredPosDivision: Record<string, string>[] = [];
  selectedPosDivision: any = '';
  posDivision: any = [
    { name: 'Hong Kong', value: '70'},
    { name: 'Macau', value: '68'}
  ];

  filteredVendorDivision: Record<string, string>[] = [];
  selectedVendorDivision: any = '';
  vendorDivision: any = [
    { name: 'Hong Kong', value: '70'},
    { name: 'Macau', value: '68'}
  ];

  filteredVendorLocation: Record<string, string>[] = [];
  selectedVendorLocation: any = '';
  vendorLocation: any = Hk_Location;

  filteredListingDivision: Record<string, string>[] = [];
  selectedListingDivision: any = '';
  listingDivision: any = [
    { name: 'Hong Kong', value: '70'},
    { name: 'Macau', value: '68'},
  ];

  filteredListingLocation: Record<string, string>[] = [];
  selectedListingLocation: any = '';
  listingLocation: any = Hk_Location;

  filteredMcsDivision: Record<string, string>[] = [];
  selectedMcsDivision: any = '';
  mcsDivision: any = [
    { name: 'Hong Kong', value: '70'},
    { name: 'Macau', value: '68'}
  ];

  filteredPosLocation: Record<string, string>[] = [];
  selectedPosLocation: any = '';
  posLocation: any = Hk_Location;

  filteredMcsLocation: Record<string, string>[] = [];
  selectedMcsLocation: any = '';
  mcsLocation: any = Hk_Location;

  ngOnInit(): void {
    this.onGetDetailsScreen();
  }

  onGetDetailsScreen = () => {
    this.singleProduct = this.fa.productDetails;
    this.singleSapUPC = this.fa.sapUpc;
    this.singlePimUPC = this.fa.pimUpc;
    this.attributeData = this.fa.attributeDetails;
  }

  openDialog() {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('index => ', tabChangeEvent.index);
  }

  openSnackBar = (message: string, action: string) => {
    this._snackBar.open(message, action, {duration : 2000});
  }

  onPosDivisionSelection = (posDivision) => {
    this.posDivisionSelection = posDivision;
    setTimeout(() => {
      this.onGetPosUpc();
    }, 100);
  }

  onMcsDivisionSelection = (mcsDivision) => {
    this.mcsDivisionSelection = mcsDivision;
    setTimeout(() => {
      this.onGetMcsUpc();
    }, 100);
  }

  onPosLocationSelection = (posLocation) => {
    this.posLocationSelection = posLocation;
    setTimeout(() => {
      this.onGetPosUpc();
    }, 100);
  }

  onMcsLocationSelection = (mcsLocation) => {
    this.mcsLocationSelection = mcsLocation;
    setTimeout(() => {
      this.onGetMcsUpc();
    }, 100);
  }


  onVendorDivisionSelection = (venDivision) => {
    this.vendorDivSelection = venDivision;
    setTimeout(() => {
      this.onGetVendorData();
    }, 100);
  }

  onListingDivisionSelection = (listDivision) => {
    this.listingDivSelection = listDivision;
    setTimeout(() => {
      this.onGetListingData();
    }, 100);
  }

  onVendorLocationSelection = (venLocation) => {
    this.vendorLocationSelection = venLocation;
    setTimeout(() => {
      this.onGetVendorData();
    }, 100);
  }

  onListingLocationSelection = (listLocation) => {
    this.listingLocationSelection = listLocation;
    setTimeout(() => {
      this.onGetListingData();
    }, 100);
  }

  onGetVendorData = () => {
    if(this.vendorDivSelection === ''){
      this.openSnackBar('Please select division', 'OK');
    } else {

    }
  }

  onGetListingData = () => {
    if(this.listingDivSelection === ''){
      this.openSnackBar('Please select division', 'OK');
    } else {
      
    }
  }

  onGetMcsUpc = () => {
    this.mcsUpcData = [];
    if(this.mcsDivisionSelection === ''){
      this.openSnackBar('Please select division as well', 'OK');
    } else if(this.mcsLocationSelection === ''){
      this.openSnackBar('Please select location as well', 'OK');
    } else {
      const url = `https://uat.api.dfs.com/upcean?division=${this.mcsDivisionSelection}&location=${this.mcsLocationSelection}`;
      if (!this.mcsDivisionSelection && !this.mcsLocationSelection) return;
      this.http.get(url).subscribe(data => {
        this.mcsUpcResponseData = data;
        if(this.mcsUpcResponseData.length != 0) {
          const arr = this.mcsUpcResponseData.UPC.secondaryUPC;
          const obj2 = {secondary : {...arr}}
          const obj3 = {primary : this.mcsUpcResponseData.UPC.primaryUPC}
          this.mcsUpcData = {...obj2, ...obj3};
          console.log('this.mcsUpcData MCS UPC', this.mcsUpcData)
        }
      });
    }
  }

  onGetPosUpc = () => {
    this.posUpcData = [];
    if(this.posDivisionSelection === ''){
      this.openSnackBar('Please select division as well', 'OK');
    } else if(this.posLocationSelection === ''){
      this.openSnackBar('Please select location as well', 'OK');
    } else {
      const url = `https://uat.api.dfs.com/price?csku=${this.singleProduct.article_Number}&divisionid=${this.posDivisionSelection}&storeid=${this.posLocationSelection}`
      if (!this.posDivisionSelection && !this.posLocationSelection) return;
      this.http.get(url).subscribe(data => {
        this.posUpcResponseData = data;
        if(this.posUpcResponseData.getPriceDetailsOutput.results.length != 0) {
          for (let i = 0; i < this.posUpcResponseData.getPriceDetailsOutput.results.length; i++) {
            if(i== 0){
              this.posUpcData.push(
              {
                'UPC' : this.posUpcResponseData.getPriceDetailsOutput.results[0].UPC,
                'Title' : 'Primary UPC'
              })
            }else {
              this.posUpcData.push(
              {
                'UPC' : this.posUpcResponseData.getPriceDetailsOutput.results[i].UPC,
                'Title' : 'Secondary UPC'
              })
            }
          }
        } else {
          this.openSnackBar('No Data Found', 'OK');
        }
        console.log('this.posUpcData MCS UPC', this.posUpcData)
      });
    }
  }
}
