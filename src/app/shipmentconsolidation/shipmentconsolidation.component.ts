import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AfterInitiateComponent } from '../after-initiate/after-initiate.component';
import { InterdataService } from '../interdata.service';
import { HttpClient } from '@angular/common/http';
import { StockdataService } from '../stockdata.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ShipmentconsolidatemodaldialogComponent } from '../shipmentconsolidatemodaldialog/shipmentconsolidatemodaldialog.component';
import { RolesetService } from '../roleset.service';

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
}

@Component({
  selector: 'app-shipmentconsolidation',
  templateUrl: './shipmentconsolidation.component.html',
  styleUrls: ['./shipmentconsolidation.component.css'],
})
export class ShipmentconsolidationComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private stockdataService: StockdataService,
    private interdataService: InterdataService,
    private rolesetService: RolesetService
  ) {}

  steps: any = [
    { p: 'planning', h2: 'request', active: false },
    { p: 'planning', h2: 'approval', active: false },
    { p: 'back stores team', h2: 'fulfillment', active: false },
    { p: 'shipping team', h2: 'consolidate', active: true },
    { p: 'shipping team', h2: 'in transit', active: false },
    { p: 'stores team', h2: 'delivery', active: false },
  ];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  activeRole: any;

  itemsDataFrom: any = [];
  stockData: any = [];

  selectedTo: any = 'undefined';
  toLocations = [{ name: 'Select location', abbrev: 'undefined' }];
  filteredToLocations: Record<string, string>[] = [];

  searchTextData: any;
  transferIdData: any;

  displayedColumns: string[] = [
    'select',
    'index',
    'orderid',
    'eta',
    'totalitems',
    'totalunits',
    'specialproducts',
    'shipmentweight',
    'packageinfo',
    'dimension',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  orderItems: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  ngOnInit(): void {
    this.activeRole = this.rolesetService.interdataList[0].activeRole;

    this.getAllData();

    console.log(
      'this.interdataService.getStockdatas',
      this.interdataService.getStockdatas()
    );

    console.log(
      'this.stockdataService.getStockdatas',
      this.stockdataService.getStockdatas()
    );
  }

  getAllData() {
    this.interdataService.getAllLocationData();

    this.toLocations = this.interdataService.getToLocations();

    this.stockData = JSON.parse(
      JSON.stringify(this.interdataService.interdataList[0].shipments)
    );
  }

  resetSomeProps() {
    this.orderItems = [];
    this.searchTextData = {};
    this.transferIdData = {};

    this.selection = new SelectionModel<PeriodicElement>(true, []);
  }

  isFormEmpty(value: any) {
    if (value.toLocation === 'undefined' || value.toLocation === '')
      return false;

    return true;
  }

  onSubmit(value: any) {
    console.log(value);

    if (!this.isFormEmpty(value)) return;

    this.searchTextData = value;

    this.itemsDataFrom = JSON.parse(
      JSON.stringify(this.interdataService.interdataList[0].orders)
    ).filter((v: any, i: any) => {
      return (
        v.toLocation === value.toLocation &&
        v.status === 'fulfillment' &&
        !v.isConsolidate
      );
    });

    console.log(this.itemsDataFrom);

    this.dataSource = new MatTableDataSource(this.itemsDataFrom);
  }

  setSpecialProducts(e: any, el: any) {
    console.log(e.target.value, el);

    this.interdataService.interdataList[0].orders.forEach((v: any, i: any) => {
      if (v.id === el.id) {
        this.interdataService.interdataList[0].orders[i].specialProducts =
          e.target.value;
      }
    });

    console.log(this.interdataService.interdataList[0]);
  }

  setShipmentWeight(e: any, el: any) {
    console.log(e.target.value, el);

    this.interdataService.interdataList[0].orders.forEach((v: any, i: any) => {
      if (v.id === el.id) {
        this.interdataService.interdataList[0].orders[i].weight =
          e.target.value;
      }
    });

    console.log(this.interdataService.interdataList[0]);
  }

  setPackageInfo(e: any, el: any) {
    console.log(e.target.value, el);

    this.interdataService.interdataList[0].orders.forEach((v: any, i: any) => {
      if (v.id === el.id) {
        this.interdataService.interdataList[0].orders[i].package_info =
          e.target.value;
      }
    });

    console.log(this.interdataService.interdataList[0]);
  }

  setDimension(e: any, el: any) {
    console.log(e.target.value, el);

    this.interdataService.interdataList[0].orders.forEach((v: any, i: any) => {
      if (v.id === el.id) {
        this.interdataService.interdataList[0].orders[i].dimensions =
          e.target.value;
      }
    });

    console.log(this.interdataService.interdataList[0]);
  }

  onOrdersSubmit() {
    this.searchTextData.id = Math.floor(Math.random() * 50000 + 1).toString();
    this.transferIdData = this.searchTextData;

    this.orderItems = JSON.parse(JSON.stringify(this.selection.selected));

    let d = this.orderItems[0].shipmentDeliveryDate.split('/');
    let date = new Date(Number(d[2]), Number(d[1]) - 1, Number(d[0]));
    date.setDate(date.getDate() + 7);

    let arr: any = [],
      countQuant = 0,
      countItems = 0,
      countWeight = 0,
      countPallets = 0,
      haveSpecialProducts = 'No';

    this.orderItems.forEach((v: any, i: any) => {
      arr.push(v.id);

      countQuant += Number(v.transferQuantity);
      countItems += Number(v.totalItem);

      let w = this.interdataService.interdataList[0].orders.filter(
        (q: any, p: any) => q.id === v.id
      );

      countWeight += Number(w[0].weight);
      countPallets += Number(w[0].package_info);

      if (w[0].specialProducts == 'Yes') {
        haveSpecialProducts = 'Yes';
      }
    });

    let tl = this.toLocations.filter(
      (g: any, h: any) => g.abbrev == this.searchTextData.toLocation
    );

    let sd = {
      id: this.searchTextData.id,
      orders: arr,
      shipmentDeliveryDate: `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
      totalQuantity: countQuant,
      totalItem: countItems,
      specialProducts: haveSpecialProducts,
      weight: countWeight,
      package_info: countPallets,
      dimensions: '',
      mot: 'Air',
      isCompleted: false,
      toLocation: this.searchTextData.toLocation,
      toLocationName: tl[0].name,
    };

    this.interdataService.interdataList[0].shipments.push(sd);

    console.log(this.orderItems, this.interdataService.interdataList[0]);

    this.openDialog(sd);
  }

  openDialog(sd: any) {
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(ShipmentconsolidatemodaldialogComponent, {
      width: '750px',
      data: sd,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.stockData = JSON.parse(
        JSON.stringify(this.interdataService.interdataList[0].shipments)
      );

      console.log(this.stockData);

      this.openDialogInit();
    });
  }

  openDialogInit() {
    this.transferIdData.header =
      'Shipment Consolidation Completed. Ready for Transportation Planning';
    this.transferIdData.actionLbl = 'Please proceed to continue';
    this.transferIdData.searchPlaceHolder = 'Search Order';
    this.transferIdData.tableHeader = 'Order';
    this.transferIdData.idType = 'SHIPMENT ID';
    this.transferIdData.type = true;
    this.transferIdData.consoleType = true;

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.interdataService.interdataList[0].shipments.forEach(
        (v: any, i: any) => {
          if (v.id === this.searchTextData.id) {
            this.interdataService.interdataList[0].orders.forEach(
              (w: any, j: any) => {
                if (v.orders.includes(w.id)) {
                  this.interdataService.interdataList[0].orders[
                    j
                  ].isConsolidate = true;
                }
              }
            );
          }
        }
      );

      console.log(this.interdataService.interdataList[0]);

      this.itemsDataFrom = JSON.parse(
        JSON.stringify(this.interdataService.interdataList[0].orders)
      ).filter((v: any, i: any) => {
        return (
          v.toLocation === this.selectedTo &&
          v.status === 'fulfillment' &&
          !v.isConsolidate
        );
      });

      console.log(this.itemsDataFrom);

      this.dataSource = new MatTableDataSource(this.itemsDataFrom);

      this.resetSomeProps();
    });
  }
}
