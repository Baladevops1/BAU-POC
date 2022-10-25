import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AfterInitiateComponent } from '../after-initiate/after-initiate.component';
import { InterdataService } from '../interdata.service';
import { HttpClient } from '@angular/common/http';
import { DeliverymodaldialogcomponentComponent } from '../deliverymodaldialogcomponent/deliverymodaldialogcomponent.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private interdataService: InterdataService
  ) {}

  steps: any = [
    { p: 'planning', h2: 'request', active: false },
    { p: 'planning', h2: 'approval', active: false },
    { p: 'back stores team', h2: 'fulfillment', active: false },
    { p: 'shipping team', h2: 'consolidate', active: false },
    { p: 'shipping team', h2: 'in transit', active: false },
    { p: 'stores team', h2: 'delivery', active: true },
  ];

  items: any = [];

  searchTextData: any;
  transferIdData: any;

  selectedTo: any = 'undefined';
  toLocations: any;
  filteredToLocations: Record<string, string>[] = [];

  ngOnInit(): void {
    this.getAllData();

    console.log(
      'this.interdataService.getStockdatas',
      this.interdataService.getStockdatas()
    );
  }

  getAllData() {
    this.interdataService.getAllLocationData();

    this.toLocations = this.interdataService.getToLocations();
  }

  resetSomeProps() {
    this.searchTextData = {};
    this.transferIdData = {};

    this.items = [];
  }

  onSubmit(value: any) {
    console.log(value);

    this.searchTextData = value;

    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(DeliverymodaldialogcomponentComponent, {
      width: '1000px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.items = result;

      console.log(this.items);

      this.items = this.items.map((x: any) => ({
        ...x,
        comments: 'Ready To Deliver',
      }));

      if (result === undefined) this.items = [];
    });
  }

  setReceiveQuantity(e: any, item: any) {
    console.log(e, item);

    this.interdataService.interdataList[0].orders.filter((v: any, i: any) => {
      let countReceiveQuant = 0;

      if (v.id === item.order_id) {
        v.gridData.forEach((w: any, j: any) => {
          if (w.product === item.product_id) {
            this.interdataService.interdataList[0].orders[i].gridData[
              j
            ].receiveQuantity = e.target.value;
            item.rqty = e.target.value;
          }
        });
      }

      countReceiveQuant += Number(v.receiveQuantity);

      this.interdataService.interdataList[0].orders[i].receiveQuantity =
        countReceiveQuant;
    });

    console.log(this.interdataService.interdataList[0]);
  }

  openDialogInit() {
    this.searchTextData.id = this.items[0].shipment_id;
    this.transferIdData = this.searchTextData;
    this.transferIdData.header = 'Shipment has been Received Successfully';
    this.transferIdData.actionLbl = 'Please proceed to continue';
    this.transferIdData.idType = 'SHIPMENT ID';
    this.transferIdData.TrType = true;

    this.transferIdData.type = true;

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.interdataService.interdataList[0].shipments.forEach(
        (v: any, i: any) => {
          if (v.id === this.items[0].shipment_id)
            [
              (this.interdataService.interdataList[0].shipments[i].isCompleted =
                true),
            ];
        }
      );

      this.resetSomeProps();
    });
  }
}
