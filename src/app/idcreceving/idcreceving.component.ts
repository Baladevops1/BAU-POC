import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AfterInitiateComponent } from '../after-initiate/after-initiate.component';
import { InterdataService } from '../interdata.service';
import { StockrecevingdialogComponent } from '../stockrecevingdialog/stockrecevingdialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-idcreceving',
  templateUrl: './idcreceving.component.html',
  styleUrls: ['./idcreceving.component.css'],
})
export class IdcrecevingComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private interdataService: InterdataService,
    private route: ActivatedRoute
  ) {}

  steps: any = [
    { p: 'planning', h2: 'request', active: false },
    { p: 'planning', h2: 'approval', active: false },
    { p: 'back stores team', h2: 'fulfillment', active: true },
    { p: 'shipping team', h2: 'consolidate', active: false },
    { p: 'shipping team', h2: 'in transit', active: false },
    { p: 'stores team', h2: 'delivery', active: false },
  ];

  fromLocations: any;
  filteredFromLocations: Record<string, string>[] = [];
  selectedFrom: any = 'undefined';

  status: any = '';
  activeID: any = '';

  items: any = [];
  itemsData: any;
  transferIdData: any;

  orderIndex: any;
  gridIndex: any;

  gridData = false;

  searchTextData: any;
  results: any;

  ngOnInit() {
    this.getAllData();

    console.log(
      'this.interdataService.getStockdatas',
      this.interdataService.getStockdatas(),
      this.interdataService.getStockdatas()[0]
    );

    this.route.queryParams.subscribe((params: any) => {
      this.status = params['status'] || '';
      this.activeID = params['activeID'] || '';

      if (this.status === 'fulfillment') {
        let data = this.interdataService.interdataList[0].orders.filter(
          (v: any, j: any) => {
            if (v.id === this.activeID) {
              this.orderIndex = j;
            }

            return v.id === this.activeID;
          }
        );

        console.log(data, this.orderIndex);

        this.itemsData = JSON.parse(JSON.stringify(data[0]));

        this.items = JSON.parse(JSON.stringify(this.itemsData.gridData));

        this.selectedFrom = data[0].fromLocation;

        this.searchTextData = {
          fromLocation: data[0].fromLocation,
        };
        this.searchTextData.id = this.itemsData.id;

        this.transferIdData = this.searchTextData;
        this.transferIdData.type = true;
      } else {
        this.itemsData = this.interdataService.interdataList[0].orders;
      }
    });
  }

  getAllData() {
    this.interdataService.getAllLocationData();

    this.fromLocations = this.interdataService.getFromLocations();
  }

  resetSomeProps() {
    this.status = '';

    this.orderIndex = '';
    this.gridIndex = '';

    this.items = [];

    this.searchTextData = {};
    this.transferIdData = {};
  }

  isFormEmpty(value: any) {
    if (value.fromLocation === 'undefined' || value.fromLocation === '')
      return false;

    return true;
  }

  onSubmit(value: any) {
    console.log(value);

    if (!this.isFormEmpty(value)) return;

    this.openDialog(value);
  }

  countApprovalQuantities() {
    let countTransferQuant = 0;

    for (
      let j = 0;
      j <
      this.interdataService.interdataList[0].orders[this.orderIndex].gridData
        .length;
      j++
    ) {
      countTransferQuant += Number(
        this.interdataService.interdataList[0].orders[this.orderIndex].gridData[
          j
        ].transferQuantity
      );
    }

    this.interdataService.interdataList[0].orders[
      this.orderIndex
    ].transferQuantity = countTransferQuant;

    console.log(this.interdataService.interdataList[0]);
  }

  setApprovalTransferQuantity(e: any, i: any) {
    console.log(e, i);

    this.gridIndex = i;

    this.interdataService.interdataList[0].orders[this.orderIndex].gridData[
      this.gridIndex
    ].transferQuantity = e.target.value;

    this.countApprovalQuantities();

    console.log(this.interdataService.interdataList[0]);
  }

  openDialog(value: any) {
    this.searchTextData = value;
    this.transferIdData = this.searchTextData;
    this.transferIdData.type = true;

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(StockrecevingdialogComponent, {
      width: '750px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.itemsData = JSON.parse(JSON.stringify(result));

      this.items = JSON.parse(JSON.stringify(this.itemsData.gridData));

      let data = this.interdataService.interdataList[0].orders.forEach(
        (v: any, j: any) => {
          if (v.id === this.itemsData.id) {
            this.orderIndex = j;
          }
        }
      );

      console.log(this.itemsData, this.items, this.orderIndex);

      this.searchTextData.id = this.itemsData.id;

      if (result === undefined) this.items = [];
      else {
        console.log('FINALDATA', this.itemsData.gridData);
      }
    });
  }

  openDialogInit() {
    this.searchTextData.id = this.itemsData.id;
    this.transferIdData.header =
      'Transfer Request has been initiated Successfully';
    this.transferIdData.actionLbl = 'Please proceed to continue';
    this.transferIdData.idType = 'ORDER ID';
    this.transferIdData.selectedFrom = this.selectedFrom;

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.gridIndex, this.orderIndex);

      this.interdataService.interdataList[0].orders[this.orderIndex].status =
        'fulfillment';

      this.resetSomeProps();
    });
  }
}
