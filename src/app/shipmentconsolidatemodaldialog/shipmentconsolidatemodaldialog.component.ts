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
  selector: 'app-shipmentconsolidatemodaldialog',
  templateUrl: './shipmentconsolidatemodaldialog.component.html',
  styleUrls: ['./shipmentconsolidatemodaldialog.component.css'],
})
export class ShipmentconsolidatemodaldialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockdataService: StockdataService,
    private interdataService: InterdataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShipmentconsolidatemodaldialogComponent>
  ) {}

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  items: any;
  itemsDataFrom: any;

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
    console.log(
      this.data,
      this.interdataService.getStockdatas(),
      this.stockdataService.getStockdatas()
    );

    this.itemsDataFrom = this.interdataService.getStockdatas();

    console.log(this.itemsDataFrom);

    this.dataSource = new MatTableDataSource(this.itemsDataFrom);
  }

  setSpecialProducts(e: any, data: any) {
    console.log(e.target.value, data);

    this.interdataService.interdataList[0].shipments.forEach(
      (v: any, i: any) => {
        if (v.id === data.id) {
          this.interdataService.interdataList[0].shipments[i].specialProducts =
            e.target.value;
        }
      }
    );

    console.log(this.interdataService.interdataList[0]);
  }

  setShipmentWeight(e: any, data: any) {
    console.log(e.target.value, data);

    this.interdataService.interdataList[0].shipments.forEach(
      (v: any, i: any) => {
        if (v.id === data.id) {
          this.interdataService.interdataList[0].shipments[i].weight =
            e.target.value;
        }
      }
    );

    console.log(this.interdataService.interdataList[0]);
  }

  setPackageInfo(e: any, data: any) {
    console.log(e.target.value, data);

    this.interdataService.interdataList[0].shipments.forEach(
      (v: any, i: any) => {
        if (v.id === data.id) {
          this.interdataService.interdataList[0].shipments[i].package_info =
            e.target.value;
        }
      }
    );

    console.log(this.interdataService.interdataList[0]);
  }

  setMOT(e: any, data: any) {
    console.log(e.target.value, data);

    this.interdataService.interdataList[0].shipments.forEach(
      (v: any, i: any) => {
        if (v.id === data.id) {
          this.interdataService.interdataList[0].shipments[i].mot =
            e.target.value;
        }
      }
    );

    console.log(this.interdataService.interdataList[0]);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
