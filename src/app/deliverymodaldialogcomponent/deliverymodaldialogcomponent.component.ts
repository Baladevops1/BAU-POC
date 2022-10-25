import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StockdataService } from '../stockdata.service';
import { InterdataService } from '../interdata.service';

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
  selector: 'app-deliverymodaldialogcomponent',
  templateUrl: './deliverymodaldialogcomponent.component.html',
  styleUrls: ['./deliverymodaldialogcomponent.component.css'],
})
export class DeliverymodaldialogcomponentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockdataService: StockdataService,
    private interdataService: InterdataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeliverymodaldialogcomponentComponent>
  ) {}

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  items: any = [];
  itemsDataFrom: any;
  stockData: any = [];

  displayedColumns: string[] = ['select', 'product'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

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
    this.stockData = this.interdataService.interdataList[0].shipments.filter(
      (v: any, i: any) => !v.isCompleted
    );

    console.log(this.stockData);

    this.dataSource = new MatTableDataSource(this.stockData);
  }

  onSubmit() {
    console.log(this.selection.selected);

    let items: any = [];

    this.interdataService.interdataList[0].shipments.forEach(
      (v: any, i: any) => {
        if (v.id === this.selection.selected[0].id) {
          v.orders.forEach((w: any, j: any) => {
            let od = this.interdataService.interdataList[0].orders.filter(
              (q: any, p: any) => {
                return q.id === w;
              }
            );

            od[0].gridData.forEach((x: any, k: any) => {
              items.push({
                shipment_id: v.id,
                order_id: v.orders[j],
                product_id: x.product,
                to_location: od[0].toLocation,
                eta: od[0].shipmentDeliveryDate,
                qty: x.transferQuantity,
                rqty: 0,
                product_desc: x.productDesc,
              });
            });
          });
        }
      }
    );

    this.items = items;

    console.log(this.items);

    localStorage.setItem('trackId', this.items[0]?.id);
    this.dialogRef.close(this.items);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
