import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InterdataService } from '../interdata.service';
import { RolesetService } from '../roleset.service';
import { CartService } from '../Cart.service';

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
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(
    public router: Router,
    private interdataService: InterdataService,
    private rolesetService: RolesetService,
    private cartService: CartService
  ) {}

  activeRole: any;
  itemsDataFrom: any;
  saveData: any;
  TrType: any;
  displayedColumns: string[] = [
    'order_id',
    'destination_location',
    'eta_date',
    'total_items',
    'total_quantity',
    'button',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  toLocations: any;

  items: any;

  getLocation(loc: any) {
    let d: any = this.toLocations.filter((v: any, i: any) => v.abbrev == loc)[0]
      .name;

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
    this.activeRole = this.rolesetService.interdataList[0].activeRole;

    if (this.activeRole != 5) {
      this.interdataService.getAllLocationData();

      this.toLocations = this.interdataService.getToLocations();

      console.log(
        'this.interdataService.getStockdatas',
        this.interdataService.getStockdatas()
      );

      this.itemsDataFrom = [];

      for (
        let i = 0;
        i < this.interdataService.interdataList[0].orders.length;
        i++
      ) {
        console.log(this.interdataService.interdataList[0].orders[i]);

        if (
          this.interdataService.interdataList[0].orders[i].status ===
            'request' &&
          this.activeRole == 1
        ) {
          this.itemsDataFrom.push(
            this.interdataService.interdataList[0].orders[i]
          );
        } else if (
          this.interdataService.interdataList[0].orders[i].status ===
            'approval' &&
          this.activeRole == 2
        ) {
          this.itemsDataFrom.push(
            this.interdataService.interdataList[0].orders[i]
          );
        }
      }

      console.log(this.activeRole, this.itemsDataFrom);

      this.dataSource = new MatTableDataSource(this.itemsDataFrom);
    } else if (this.activeRole == 5) {
      this.itemsDataFrom = [];

      // for (let i = 0; i < this.cartService.cartList[0].cart.length; i++) {
      //   console.log(this.cartService.cartList[0].cart[i]);

      //   if (this.cartService.cartList[0].cart[i].status === 'selected from cart') {
      //     this.itemsDataFrom.push(this.cartService.cartList[0].cart[i]);
      //   }
      // }

      this.itemsDataFrom.push(this.cartService.cartList[0].orders[0]);

      console.log(this.activeRole, this.itemsDataFrom);

      this.dataSource = new MatTableDataSource(this.itemsDataFrom);
    }
  }

  ngDoCheck() {
    if (this.activeRole != 5) {
      this.itemsDataFrom = [];

      for (
        let i = 0;
        i < this.interdataService.interdataList[0].orders.length;
        i++
      ) {
        console.log(this.interdataService.interdataList[0].orders[i]);

        if (
          this.interdataService.interdataList[0].orders[i].status ===
            'request' &&
          this.activeRole == 1
        ) {
          this.itemsDataFrom.push(
            this.interdataService.interdataList[0].orders[i]
          );
        } else if (
          this.interdataService.interdataList[0].orders[i].status ===
            'approval' &&
          this.activeRole == 2
        ) {
          this.itemsDataFrom.push(
            this.interdataService.interdataList[0].orders[i]
          );
        }
      }

      console.log(this.activeRole, this.itemsDataFrom);

      this.dataSource = new MatTableDataSource(this.itemsDataFrom);
    }
  }

  onSubmit(element) {
    // this.items = JSON.parse(JSON.stringify(this.selection.selected));
    this.items = JSON.parse(JSON.stringify([element]));

    console.log(this.items);

    let Ddata: any;
    let status = this.items[0].status;
    console.log(Ddata);
    localStorage.setItem('trackId', Ddata?.id);

    if (status == 'request') {
      this.interdataService.interdataList[0].id = this.items[0].id;
      this.interdataService.interdataList[0].toLocation =
        this.items[0].toLocation;
      this.interdataService.interdataList[0].fromLocation =
        this.items[0].fromLocation;
      this.interdataService.interdataList[0].toDivision =
        this.items[0].toDivision;
      this.interdataService.interdataList[0].shipmentDeliveryDate =
        this.items[0].shipmentDeliveryDate;
      this.interdataService.interdataList[0].transferInitiatedDate =
        this.items[0].transferInitiatedDate;
      this.interdataService.interdataList[0].reference =
        this.items[0].reference;
      this.interdataService.interdataList[0].gridData = JSON.parse(
        JSON.stringify(this.items[0].gridData)
      );
      this.interdataService.interdataList[0].status = 'approval';
      this.interdataService.interdataList[0].totalQuantity =
        this.items[0].totalQuantity;
      this.interdataService.interdataList[0].transferQuantity =
        this.items[0].transferQuantity;
      this.interdataService.interdataList[0].totalItem =
        this.items[0].totalItem;

      this.router.navigate(['/idctransfer'], {
        queryParams: { status: 'approval' },
      });
    } else {
      this.router.navigate(['/idctransferin'], {
        queryParams: { status: 'fulfillment', activeID: this.items[0].id },
      });
    }
  }

  onSubmitOrderCreation(element: any) {
    console.log(element);

    this.items = JSON.parse(JSON.stringify([element]));

    console.log(this.items);

    let Ddata: any;
    let status = this.items[0].status;
    console.log(Ddata);
    localStorage.setItem('trackId', Ddata?.id);

    this.router.navigate(['/order-creation'], {
      queryParams: { status: 'approval', activeID: this.items[0].order_creation_id },
    });
  }
}
