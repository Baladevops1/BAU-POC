import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogcardComponent } from '../dialogcard/dialogcard.component';
import { AfterInitiateComponent } from '../after-initiate/after-initiate.component';
import { InterdataService } from '../interdata.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { CartService } from '../Cart.service';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};

export interface PeriodicElement {
  position: number;
  id: string;
  toLocation: string;
  fromLocation: string;
  toDivision: string;
  shipmentDeliveryDate: string;
  transferInitiatedDate: string;
  reference: string;
  gridData: any;
  totalQuantity: string;
  totalItem: string;
  rowType: string;
}

@Component({
  selector: 'app-orderplannercreation',
  templateUrl: './orderplannercreation.component.html',
  styleUrls: ['./orderplannercreation.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OrderplannercreationComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private interdataService: InterdataService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  steps: any = [
    { p: 'order', h2: 'creation', active: true },
    { p: 'shipping team', h2: 'consolidate', active: false },
    { p: 'shipping team', h2: 'in transit', active: false },
    { p: 'stores team', h2: 'delivery', active: false },
  ];

  fromLocations: any;
  filteredFromLocations: Record<string, string>[] = [];

  toDivisions: any;
  filteredDivision: Record<string, string>[] = [];

  toLocations: any;
  filteredToLocations: Record<string, string>[] = [];

  selectedFrom: any = 'undefined';
  selectedTo: any = 'undefined';
  division: any = 'Select division';

  etaDate: any = '';
  etaDateLink: any = new FormControl();
  currentDate: any = new FormControl(new Date());
  reference: any;

  rowType: any = '';
  status: any = '';
  chooseNewProduct: any;

  items: any = [];
  itemsDataFrom: any;
  transferIdData: any;

  transferQuantity: any = 0;

  orderIndex: any;
  gridIndex: any;

  randNumber = '5000';
  saveData: any;
  dataSource = new MatTableDataSource<PeriodicElement>();

  activeOrder: any;
  results: any;
  results1: any;
  ListingDetails: any;

  ngOnInit(): void {
    this.getAllData();

    this.route.queryParams.subscribe((params: any) => {
      this.status = params['status'] || 'create order';

      this.activeOrder = params['activeID'];

      if (this.status === 'approval') {
        this.steps[0].active = true;
        this.steps[1].active = false;

        this.selectedFrom = '1322';
        this.selectedTo = '1338';
        //this.division = this.interdataService.orderCreationList[0].toDivision;

        var timestamp = Date.parse(
          this.cartService.cartList[0].orders[0].eta_date
        );
        console.log(this.cartService.cartList[0], timestamp);

        let d: any =
          this.cartService.cartList[0].orders[0].eta_date.split(
            '/'
          );

        this.etaDateLink.setValue(
          new Date(Number(d[2]), Number(d[1]) - 1, Number(d[0]))
        );

        this.items = JSON.parse(
          JSON.stringify(this.cartService.cartList[0].orders[0].items)
        );

        let data = this.interdataService.orderCreationList[0].orders.forEach(
          (v: any, j: any) => {
            if (v.id === this.interdataService.orderCreationList[0].id) {
              this.orderIndex = j;
            }
            return v.id === this.interdataService.orderCreationList[0].id;
          }
        );
      } else {
        this.steps[1].active = false;
        this.steps[0].active = true;

        this.resetAllProps();
      }
    });
  }

  getAllData() {
    this.interdataService.getAllLocationData();

    this.fromLocations = this.interdataService.getFromLocations();
    this.toDivisions = this.interdataService.getToDivisions();
    this.toLocations = this.interdataService.getFromLocations();

    this.itemsDataFrom = this.interdataService.orderCreationList[0].orders;
  }

  setDateAndMonthAndYear(e: any) {
    console.log(e.format('DD/MM/YYYY'));

    this.etaDate = e.format('DD/MM/YYYY');
  }

  isFormEmpty(value: any) {
    if (
      value.fromLocation === 'undefined' ||
      value.toLocation === 'Select location'
      //|| value.toDivision === 'Select division'
    )
      return false;

    return true;
  }

  resetAllProps() {
    this.resetSomeProps();

    this.selectedFrom = 'undefined';
    this.selectedTo = 'undefined';
    //this.division = 'Select division';

    this.interdataService.orderCreationList[0].fromLocation = '';
    //this.interdataService.orderCreationList[0].toDivision = '';
    this.interdataService.orderCreationList[0].toLocation = '';
    this.interdataService.orderCreationList[0].shipmentDeliveryDate = '';
    this.interdataService.orderCreationList[0].transferInitiatedDate = '';
    this.interdataService.orderCreationList[0].reference = '';
  }

  resetSomeProps() {
    this.items = [];
    this.transferIdData = {};
    this.chooseNewProduct = {};
    this.orderIndex = '';
    this.gridIndex = '';

    this.interdataService.orderCreationList[0].id = '';
    this.interdataService.orderCreationList[0].gridData = [];
    this.interdataService.orderCreationList[0].status = '';
    this.interdataService.orderCreationList[0].totalQuantity = 0;
    this.interdataService.orderCreationList[0].transferQuantity = 0;
    this.interdataService.orderCreationList[0].totalItem = 0;
  }

  onSubmit(value: any) {
    console.log(value);

    if (!this.isFormEmpty(value)) return;

    this.chooseNewProduct = value;
    this.chooseNewProduct.shipmentDeliveryDate = this.etaDate;

    //this.chooseNewProduct.id = ''; //this.x;

    // this.transferIdData = this.chooseNewProduct;
    // this.transferIdData.header =
    //   'Order Request has been Initiatied Successfully';
    // this.transferIdData.actionLbl = 'Send for Approval';
    // this.transferIdData.idType = 'ORDER ID';

    // this.http
    //   .get('https://uat.api.dfs.com/listing?siteNumber=' + value.fromLocation)
    //   .subscribe((data) => {
    //     console.log('data', data);
    //     this.results1 = data;
    //     let lastnChars1 = '"1000868"';
    //     let lastnChars;
    //     if (this.results1.ListingDetails) {
    //       for (let i = 0; i <= 20; i++) {
    //         if (
    //           this.results1.ListingDetails[i] &&
    //           this.results1.ListingDetails[i].ARTNR
    //         ) {
    //           if (this.results1.ListingDetails[i].ARTNR.length > 7) {
    //             lastnChars = this.results1.ListingDetails[i].ARTNR.substring(
    //               this.results1.ListingDetails[i].ARTNR.length - 7,
    //               this.results1.ListingDetails[i].ARTNR.length
    //             );
    //             lastnChars1 = lastnChars1 + ',' + '"' + lastnChars + '"';
    //           }
    //         }
    //       }
    //     }
    //     this.http
    //       .get('https://uat.api.dfs.com/product?itemNumbers=' + lastnChars1)
    //       .subscribe((data) => {
    //         this.testData = data;
    //         if (this.testData.ItemDetails) {
    //           console.log('data1', this.testData);
    //           this.chooseNewProduct.ItemDetails = this.testData.ItemDetails;
    //           this.chooseNewProduct.selectedFrom = this.selectedFrom;
    //           this.openDialog();
    //         }
    //       });
    //   });

    let dummyData = {
      ItemDetails: [
        {
          GTINNumber: '027131392378',
          ItemDescription: 'EL DOUBL FND SIP SPF10 30ML 36-SA',
          ItemNumber: '1099688',
          BrandCategory: [
            {
              id: '7164@10002',
              label: 'Estee Lauder',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '44963@10001',
              label: 'Foundations',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '3348900662629',
          ItemDescription: 'DIOR DH ',
          ItemNumber: '1000868',
          BrandCategory: [
            {
              id: '6549@10002',
              label: 'Christian Dior',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '45265@10001',
              label: 'Fragrance Singles',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '3348900662636',
          ItemDescription: 'DIOR DH DHL EDT 100ML',
          ItemNumber: '1000884',
          BrandCategory: [
            {
              id: '6549@10002',
              label: 'Christian Dior',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '45265@10001',
              label: 'Fragrance Singles',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '088300162512',
          ItemDescription: 'CK EUPHO EUPHORIAL EDP 100ML',
          ItemNumber: '1052653',
          BrandCategory: [
            {
              id: '7159@10002',
              label: 'Calvin Klein',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '45265@10001',
              label: 'Fragrance Singles',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '020714227661',
          ItemDescription: 'CQ 3 STE LIQUID SOAP MILD 200ML',
          ItemNumber: '1010412',
          BrandCategory: [
            {
              id: '7889@10002',
              label: 'Clinique',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '46717@10001',
              label: 'Cleansers',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '020714227685',
          ItemDescription: 'CQ 3 STE SOAP LQD OIL SKN 200ML',
          ItemNumber: '1010511',
          BrandCategory: [
            {
              id: '7889@10002',
              label: 'Clinique',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '46717@10001',
              label: 'Cleansers',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '020714215552',
          ItemDescription: 'CQ CLEANIG BAL 125ML',
          ItemNumber: '1282912',
          BrandCategory: [
            {
              id: '7889@10002',
              label: 'Clinique',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '46717@10001',
              label: 'Cleansers',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '020714240158',
          ItemDescription: 'CQ 3 STE SOAP LQD EX MILD 200ML',
          ItemNumber: '1010578',
          BrandCategory: [
            {
              id: '7889@10002',
              label: 'Clinique',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '46717@10001',
              label: 'Cleansers',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '7640113837242',
          ItemDescription: 'HMLTN Jazzmas STEEL BLT AUTO 42 BLK ',
          ItemNumber: '1183516',
          BrandCategory: [
            {
              id: '6525@10002',
              label: 'Hamilton',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '44490@10001',
              label: 'M Watch Automatic',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '027131392385',
          ItemDescription: 'EL DOUBL FND SIP SPF10 30ML 37-TA',
          ItemNumber: '1099696',
          BrandCategory: [
            {
              id: '7164@10002',
              label: 'Estee Lauder',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '44963@10001',
              label: 'Foundations',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '027131392347',
          ItemDescription: 'EL DOUBL FND SIP SPF10 30ML 17-BO',
          ItemNumber: '1099670',
          BrandCategory: [
            {
              id: '7164@10002',
              label: 'Estee Lauder',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '44963@10001',
              label: 'Foundations',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '773602102235',
          ItemDescription: 'MAC 38-AL',
          ItemNumber: '1112325',
          BrandCategory: [
            {
              id: '7019@10002',
              label: 'M.A.C.',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '44945@10001',
              label: 'Eye Color',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '773602002436',
          ItemDescription: 'MAC L/S FROST M300 3G 0F-',
          ItemNumber: '1114768',
          BrandCategory: [
            {
              id: '7019@10002',
              label: 'M.A.C.',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '44946@10001',
              label: 'Lipstick',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '2002000026699',
          ItemDescription: 'VCA Vintage WG STRP QRTZ 26 WHT F',
          ItemNumber: '1029644',
          BrandCategory: [
            {
              id: '7878@10002',
              label: 'Van Cleef & Arpels',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '45750@10001',
              label: 'W Watch Quartz',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '2002000214850',
          ItemDescription: 'TAGHR OTHWACC ',
          ItemNumber: '1235555',
          BrandCategory: [
            {
              id: '9033@10002',
              label: 'Tag Heuer',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '46032@10001',
              label: 'Other Watch Accessories',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '2002000219381',
          ItemDescription: '.',
          ItemNumber: '1241884',
          BrandCategory: [
            {
              id: '8290@10002',
              label: 'Coach',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '44997@10001',
              label: 'SHOPPING BAGS',
              entityId: 3000,
            },
          ],
        },
        {
          GTINNumber: '400011968151',
          ItemDescription: 'DIOR E/PAL GWP TEMPT PCH ',
          ItemNumber: '1196815',
          BrandCategory: [
            {
              id: '6549@10002',
              label: 'Christian Dior',
              entityId: 3000,
            },
          ],
          ProductCategory: [
            {
              id: '45288@10001',
              label: 'Fragrance Accessories',
              entityId: 3000,
            },
          ],
        },
      ],
    };

    let testData = dummyData;

    if (testData.ItemDetails) {
      console.log('data1', testData);
      this.chooseNewProduct.ItemDetails = testData.ItemDetails;
      this.chooseNewProduct.selectedFrom = this.selectedFrom;
      this.openDialog();
    }
  }

  countQuantities() {
    let countQuant = 0,
      countTransferQuant = 0;

    for (let j = 0; j < this.items.length; j++) {
      countQuant += Number(this.items[j].onHand);
      countTransferQuant += Number(this.items[j].transferQuantity);
    }

    this.chooseNewProduct.totalQuantity = countQuant;
    this.chooseNewProduct.transferQuantity = countTransferQuant;
    this.chooseNewProduct.gridData = this.items;
    this.chooseNewProduct.totalItem = this.items.length;

    console.log(this.chooseNewProduct);
  }

  countApprovalQuantities() {
    let countTransferQuant = 0;

    for (
      let j = 0;
      j <
      this.interdataService.orderCreationList[0].orders[this.orderIndex]
        .gridData.length;
      j++
    ) {
      countTransferQuant += Number(
        this.interdataService.orderCreationList[0].orders[this.orderIndex]
          .gridData[j].transferQuantity
      );
    }

    this.interdataService.orderCreationList[0].orders[
      this.orderIndex
    ].transferQuantity = countTransferQuant;

    console.log(this.interdataService.orderCreationList[0]);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(DialogComponent, {
      width: '950px',
      data: this.chooseNewProduct,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result === undefined) this.items = [];
      else {
        this.rowType = 'request';
        this.items = JSON.parse(JSON.stringify(result));

        this.countQuantities();
      }
    });
  }

  createNewOrder() {
    this.interdataService.orderCreationList[0].id = this.chooseNewProduct.id;
    this.interdataService.orderCreationList[0].toLocation =
      this.chooseNewProduct.toLocation;
    this.interdataService.orderCreationList[0].fromLocation =
      this.chooseNewProduct.fromLocation;
    //this.interdataService.orderCreationList[0].toDivision =
    //this.chooseNewProduct.toDivision;
    this.interdataService.orderCreationList[0].shipmentDeliveryDate =
      this.chooseNewProduct.shipmentDeliveryDate;
    this.interdataService.orderCreationList[0].transferInitiatedDate =
      this.chooseNewProduct.transferInitiatedDate;
    this.interdataService.orderCreationList[0].reference =
      this.chooseNewProduct.reference;
    this.interdataService.orderCreationList[0].gridData =
      this.chooseNewProduct.gridData;
    this.interdataService.orderCreationList[0].status = 'request';
    this.interdataService.orderCreationList[0].totalQuantity =
      this.chooseNewProduct.totalQuantity;
    this.interdataService.orderCreationList[0].transferQuantity =
      this.chooseNewProduct.transferQuantity;
    this.interdataService.orderCreationList[0].totalItem =
      this.chooseNewProduct.totalItem;

    let order: any = {
      id: this.interdataService.orderCreationList[0].id,
      toLocation: this.interdataService.orderCreationList[0].toLocation,
      fromLocation: this.interdataService.orderCreationList[0].fromLocation,
      //toDivision: this.interdataService.orderCreationList[0].toDivision,
      shipmentDeliveryDate:
        this.interdataService.orderCreationList[0].shipmentDeliveryDate,
      transferInitiatedDate:
        this.interdataService.orderCreationList[0].transferInitiatedDate,
      reference: this.interdataService.orderCreationList[0].reference,
      gridData: this.interdataService.orderCreationList[0].gridData,
      status: 'request',
      totalQuantity: this.interdataService.orderCreationList[0].totalQuantity,
      rlQuantity: this.interdataService.orderCreationList[0].transferQuantity,
      transferQuantity:
        this.interdataService.orderCreationList[0].transferQuantity,
      receiveQuantity: '0',
      specialProducts: 'No',
      weight: '',
      package_info: '',
      dimensions: '',
      totalItem: this.interdataService.orderCreationList[0].totalItem,
      isConsolidate: false,
    };

    this.interdataService.orderCreationList[0].orders.push(order);
  }

  setTransferQuantity(e: any, i: any) {
    console.log(e, i);

    this.chooseNewProduct.gridData[i].transferQuantity = e.target.value;

    this.countQuantities();

    console.log(this.chooseNewProduct);
  }

  setApprovalTransferQuantity(e: any, i: any) {
    console.log(e, i);

    this.gridIndex = i;

    this.interdataService.orderCreationList[0].orders[this.orderIndex].gridData[
      this.gridIndex
    ].transferQuantity = e.target.value;

    this.countApprovalQuantities();

    console.log(this.interdataService.orderCreationList[0]);
  }

  onInitiate() {
    this.openDialogInit();

    this.createNewOrder();

    console.log(this.chooseNewProduct, this.interdataService.orderCreationList);
  }

  openDialogInit() {
    this.chooseNewProduct.id = this.activeOrder || Math.floor(Math.random() * 50000 + 1).toString();
    this.transferIdData = this.chooseNewProduct;
    this.transferIdData.header = 'Order Created Successfully';
    this.transferIdData.actionLbl = 'Send for Approval';
    this.transferIdData.idType = 'ORDER ID';

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.resetSomeProps();

      console.log(this.interdataService.orderCreationList);
    });
  }

  openApprovalDialogInit() {
    this.transferIdData = {};
    this.transferIdData.header = 'Order Created Successful';
    this.transferIdData.actionLbl = 'Close';
    this.transferIdData.idType = 'ORDER ID';
    this.transferIdData.id = this.activeOrder || Math.floor(Math.random() * 50000 + 1).toString();

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.gridIndex, this.orderIndex);

      this.interdataService.orderCreationList[0].orders[
        this.orderIndex
      ].status = 'approval';

      this.resetSomeProps();
    });
  }

  openStock() {
    let dialogRef = this.dialog.open(DialogcardComponent, {
      width: '400px',
      height: '200px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
      } else {
        this.router.navigate(['/', 'home']);
      }
    });
  }
}
