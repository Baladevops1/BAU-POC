import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AfterInitiateComponent } from 'src/app/after-initiate/after-initiate.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/Cart.service';

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
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  constructor(private cartService: CartService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  transferIdData: any;

  displayedColumns: string[] = [
    'select',
    'index',
    'image',
    'product',
    'quantity',
    'delete',
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  store: any = '';

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

  checkboxLabel(row?: any, cell?: any): string {
    console.log(row);

    if (!row && cell === 'head') {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  ngOnInit(): void {
    this.store = this.cartService.cartList[0].cart[0].store;

    console.log(this.cartService.cartList[0].cart);

    let d = this.cartService.cartList[0].cart.filter(
      (v: any, i: any) => v.status == 'moved to cart'
    );

    this.dataSource = new MatTableDataSource(d);
  }

  ngDoCheck() {
    console.log(this.selection);

    console.log(this.cartService.cartList[0].cart);

    let d = this.cartService.cartList[0].cart.filter(
      (v: any, i: any) => v.status == 'moved to cart'
    );

    this.dataSource = new MatTableDataSource(d);
  }

  backToPro() {
    this.cartService.isPageActive = false;
  }

  addSelected() {
    let id = Math.floor(Math.random() * 50000 + 1).toString();

    let r: any;

    this.cartService.cartList[0].cart.forEach((v: any, i: any) => {
      r = this.selection.selected.filter(
        (w: any, j: any) => v.index == w.index
      );

      if (r.length == 1) {
        this.cartService.cartList[0].cart[i].order_id = id;
        this.cartService.cartList[0].cart[i].eta_date = '21/04/2022';
        this.cartService.cartList[0].cart[i].status = 'selected from cart';
      }
    });

    let d = {
      order_creation_id: id,
      eta_date: '21/04/2022',
      store: this.selection.selected[0].store,
      items: this.selection.selected,
      totalItem: this.selection.selected.length,
      totalQuantity: this.selection.selected.length,
    };

    this.cartService.cartList[0].orders.push(d);

    this.openDialogInit(d);
  }

  openDialogInit(d: any) {
    this.transferIdData = d;
    this.transferIdData.id = d.order_creation_id;
    this.transferIdData.header = 'Order Requested Successfully';
    this.transferIdData.actionLbl = 'Close';
    this.transferIdData.idType = 'ORDER ID';

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(AfterInitiateComponent, {
      width: '500px',
      data: this.transferIdData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.cartService.cartList);

      this.cartService.isPageActive = false;

      window.scrollTo(0, 0);
    });
  }
}
