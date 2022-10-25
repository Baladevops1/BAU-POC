import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockdataService } from '../stockdata.service';
import { InterdataService } from '../interdata.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  selector: 'app-intransit',
  templateUrl: './intransit.component.html',
  styleUrls: ['./intransit.component.css'],
})
export class IntransitComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private stockdataService: StockdataService,
    private interdataService: InterdataService
  ) {}

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  steps: any = [
    { p: 'planning', h2: 'request', active: false },
    { p: 'planning', h2: 'approval', active: false },
    { p: 'back stores team', h2: 'fulfillment', active: false },
    { p: 'shipping team', h2: 'consolidate', active: false },
    { p: 'shipping team', h2: 'in transit', active: true },
    { p: 'stores team', h2: 'delivery', active: false },
  ];

  items: any = [];

  toLocations: any;
  selectedTo: any = 'undefined';
  filteredToLocations: Record<string, string>[] = [];

  displayedColumns: string[] = [
    '#',
    'shipment_id',
    'order_id',
    'eta',
    'product_id',
    'qty',
    'mot',
    'status',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();

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

  results: any;
  searcher: any;

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.interdataService.getAllLocationData();

    this.toLocations = this.interdataService.getToLocations();
  }

  onFilter(e: any) {
    console.log(e, this.interdataService.getStockdatas());
  }

  onSubmit(et: any) {
    console.log(et, this.interdataService.getStockdatas());
    let e = { searcher: et.target.value };
    let items: any = [];

    this.interdataService.interdataList[0].shipments.forEach(
      (v: any, i: any) => {
        v.orders.forEach((w: any, j: any) => {
          let od = this.interdataService.interdataList[0].orders.filter(
            (q: any, p: any) => {
              return q.id === w;
            }
          );

          let tl = this.toLocations.filter(
            (g: any, h: any) => g.abbrev == od[0].toLocation
          );

          console.log(od, tl);

          od[0].gridData.forEach((x: any, k: any) => {
            if (
              e.searcher !== '' &&
              (v.id.includes(e.searcher) ||
                od[0].id.includes(e.searcher) ||
                x.product.includes(e.searcher) ||
                od[0].shipmentDeliveryDate.includes(e.searcher) ||
                tl[0].name.toLowerCase().includes(e.searcher.toLowerCase()) ||
                v.mot.toLowerCase().includes(e.searcher.toLowerCase()))
            ) {
              items.push({
                shipment_id: v.id,
                order_id: v.orders[j],
                product_id: x.product,
                to_location: od[0].toLocation,
                to_location_name: tl[0].name,
                eta: od[0].shipmentDeliveryDate,
                qty: x.transferQuantity,
                product_desc: x.productDesc,
                mot: v.mot,
                status: v.isCompleted ? 'Completed' : 'Pick up for Delivery',
              });
            }
          });
        });
      }
    );

    this.items = items;

    this.dataSource = new MatTableDataSource(this.items);

    console.log(this.toLocations, this.items);
  }
}
