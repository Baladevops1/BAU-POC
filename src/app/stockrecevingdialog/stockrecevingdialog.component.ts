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
  selector: 'app-stockrecevingdialog',
  templateUrl: './stockrecevingdialog.component.html',
  styleUrls: ['./stockrecevingdialog.component.css'],
})
export class StockrecevingdialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockdataService: StockdataService,
    private interdataService: InterdataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StockrecevingdialogComponent>
  ) {}

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  itemsDataFrom: any;
  saveData: any;
  TrType: any;

  displayedColumns: string[] = ['select', 'product'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  toLocations: any;

  items: any;

  getLocation(loc: any) {
    let d: any = this.toLocations.filter((v: any, i: any) => v.abbrev == loc)[0].name;

    console.log(loc, d, this.toLocations);

    return d;
  }

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
    this.interdataService.getAllLocationData();

    this.toLocations = this.interdataService.getToLocations();
    
    console.log(this.interdataService.interdataList[0]);

    this.itemsDataFrom = this.interdataService.interdataList[0].orders.filter(
      (v: any, i: any) => {
        console.log(v, this.data, v.fromLocation === this.data.fromLocation);

        return (
          v.fromLocation === this.data.fromLocation && v.status === 'approval'
        );
      }
    );

    console.log(this.itemsDataFrom);

    this.dataSource = new MatTableDataSource(this.itemsDataFrom);
  }

  onSubmit() {
    this.items = JSON.parse(JSON.stringify(this.selection.selected));

    console.log(this.items);

    let Ddata: any;

    localStorage.setItem('trackId', Ddata?.id);
    this.dialogRef.close(this.items[0]);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
