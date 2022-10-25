import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  position: number;
  product: string;
  upc: string;
  expiryDate: string;
  onHand: string;
  transferQuantity: string;
  receiveQuantity: string;
  comments: string;
  productDesc: string;
  category: string;
  imgSrc: string;
  // fromLocation: string;
  trackingId: string;
}
let randomNumber = Math.floor(Math.random() * 50000 + 1);

let x = randomNumber.toString();
const ELEMENT_DATA: PeriodicElement[] = [
  // { position: 1, product: "67000154", imgSrc: "assets/67000154.jpg", upc: '2002009108785', productDesc: "CAPTURE TOTALE SUPER POTENT CLEANSER", expiryDate: "12/12/2023", category: 'Beauty', onHand: "5", transferQuantity: '5', comments: "", trackingId: x },
  // { position: 2, product: "64211391", imgSrc: "assets/64211391.jpg", upc: '2002009108808', productDesc: "DIOR PRESTIGE LE SUCRE DE GOMMAGE", expiryDate: "12/12/2023", category: 'Beauty', onHand: "5", transferQuantity: '4', comments: "", trackingId: x },
  // { position: 3, product: "60209556", imgSrc: "assets/60209556.jpg", upc: '2002009108822', productDesc: "DIORSHOW MAXIMIZER 3D", expiryDate: "12/12/2023", category: 'Beauty', onHand: "5", transferQuantity: '3', comments: "", trackingId: x },
  // { position: 4, product: "60209794", imgSrc: "assets/60209794.jpg", upc: '2002009108839', productDesc: "DIORSHOW ICONIC OVERCURL", expiryDate: "12/12/2023", category: 'Beauty', onHand: "5", transferQuantity: '2', comments: "", trackingId: x },
  // { position: 5, product: "60209786", imgSrc: "assets/60209786.jpg", upc: '2002009534089', productDesc: "OUD ISPAHAN", expiryDate: "12/12/2023", category: 'Beauty', onHand: "5", transferQuantity: '2', comments: "", trackingId: x },
  // { position: 6, product: "67148690", imgSrc: "assets/67148690.jpg", upc: '2002009534096', productDesc: "Camus XO Elegance Cognac (70cl, 40%)", expiryDate: "12/12/2023", category: 'Spirits', onHand: "4", transferQuantity: '3', comments: "", trackingId: x },
  // { position: 7, product: "60261739", imgSrc: "assets/60261739.jpg", upc: '2002009534102', productDesc: "ROUGE GRAPHIST-LIPSTICK PENCIL", expiryDate: "12/12/2023", category: 'Beauty', onHand: "5", transferQuantity: '5', comments: "", trackingId: x },
  // { position: 8, product: "60324973", imgSrc: "assets/60324973.jpg", upc: '2002009108785', productDesc: "ROUGE DIOR - THE ATELIER OF DREAMS LIMITED EDITION", expiryDate: "12/12/2023", category: 'Beauty', onHand: "7", transferQuantity: '4', comments: "", trackingId: x },
  // { position: 9, product: "60199620", imgSrc: "assets/60199620.jpg", upc: '2002009108839', productDesc: "Glenfiddich 15 Year Solera Reserve Single Malt 1L w/Gift Box", expiryDate: "12/12/2023", category: 'Spirits', onHand: "1", transferQuantity: '4', comments: "", trackingId: x },
  // { position: 10, product: "60199621", imgSrc: "assets/60199621.jpg", upc: '2002009534089', productDesc: "Jack Daniels Black 1L", expiryDate: "12/12/2023", category: 'Spirits', onHand: "5", transferQuantity: '6', comments: "", trackingId: x },
];

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  displayedColumns: string[] = ['select', 'product'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  items: any;

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
    console.log('testdhfgsdha', this.data.ItemDetails);

    let test = [
      {
        position: 1,
        product: '67000154',
        imgSrc:
          'https://media-neo.dfsglobal.cn/spu/SKU_3607225727891374933_1_en_9.jpeg',
        upc: '2002009108785',
        productDesc: 'Ultimate Glow Cushion Foundation',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '5',
        transferQuantity: '5',
        comments: '',
        trackingId: x,
      },
      {
        position: 2,
        product: '64211391',
        imgSrc:
          'https://media-neo.dfsglobal.cn/spu/SKU_3607225727891374891_1_en_11.jpeg',
        upc: '2002009108808',
        productDesc: 'Ultimate Glow Fluid Foundation',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '5',
        transferQuantity: '4',
        comments: '',
        trackingId: x,
      },
      {
        position: 3,
        product: '60209556',
        imgSrc:
          'https://media-neo.dfsglobal.cn/spu/SKU_4265046835960979578_1_en_3.jpeg',
        upc: '2002009108822',
        productDesc: 'Her Eau de Toilette for Women',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '5',
        transferQuantity: '3',
        comments: '',
        trackingId: x,
      },
      {
        position: 4,
        product: '60209794',
        imgSrc:
          'https://media-neo.dfsglobal.cn/spu/SKU_2602700497320943616_1_en_6.jpeg',
        upc: '2002009108839',
        productDesc: 'Re-Nutriv Ultra Radiance Powder Makeup SPF16/PA+++',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '5',
        transferQuantity: '2',
        comments: '',
        trackingId: x,
      },
      {
        position: 5,
        product: '60209786',
        imgSrc:
          'https://media-neo.dfsglobal.cn/spu/SKU_2579759324646277357_1_en_29.jpeg',
        upc: '2002009534089',
        productDesc:
          'Re-Nutriv Ultimate Diamond Transformative Energy Eye Crème',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '5',
        transferQuantity: '2',
        comments: '',
        trackingId: x,
      },
      {
        position: 6,
        product: '67148690',
        imgSrc: 'assets/67148690.jpg',
        upc: '2002009534096',
        productDesc: 'Kisses Matte',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '4',
        transferQuantity: '3',
        comments: '',
        trackingId: x,
      },
      {
        position: 7,
        product: '60261739',
        imgSrc: 'assets/60261739.jpg',
        upc: '2002009534102',
        productDesc: 'ROUGE GRAPHIST-LIPSTICK PENCIL',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '5',
        transferQuantity: '5',
        comments: '',
        trackingId: x,
      },
      {
        position: 8,
        product: '60324973',
        imgSrc: 'assets/60324973.jpg',
        upc: '2002009108785',
        productDesc: 'ROUGE DIOR - THE ATELIER OF DREAMS LIMITED EDITION',
        expiryDate: '12/12/2023',
        category: 'Beauty',
        onHand: '7',
        transferQuantity: '4',
        comments: '',
        trackingId: x,
      },
      {
        position: 9,
        product: '60199620',
        imgSrc: 'assets/60199620.jpg',
        upc: '2002009108839',
        productDesc:
          'Glenfiddich 15 Year Solera Reserve Single Malt 1L w/Gift Box',
        expiryDate: '12/12/2023',
        category: 'Spirits',
        onHand: '1',
        transferQuantity: '4',
        comments: '',
        trackingId: x,
      },
      {
        position: 10,
        product: '60199621',
        imgSrc: 'assets/60199621.jpg',
        upc: '2002009534089',
        productDesc: 'Jack Daniels Black 1L',
        expiryDate: '12/12/2023',
        category: 'Spirits',
        onHand: '5',
        transferQuantity: '6',
        comments: '',
        trackingId: x,
      },
    ];

    console.log('683287', this.data.ItemDetails);

    let datatest;
    let j = 0;

    for (let i = 0; i < this.data.ItemDetails.length; i++) {
      if (j == 10) j = 0;

      let randomNumber1 = Math.floor(Math.random() * 20 + 1);

      datatest = {
        position: i + 1,
        product: this.data.ItemDetails[i].ItemNumber,
        imgSrc: test[j].imgSrc,
        upc: this.data.ItemDetails[i].GTINNumber,
        productDesc: this.data.ItemDetails[i].ItemDescription,
        expiryDate: '12/12/202' + i,
        category: this.data.ItemDetails[i].BrandCategory[0].label,
        onHand: randomNumber1.toString(),
        transferQuantity: '1',
        receiveQuantity: '0',
        comments: 'Pending for FulFillment',
        trackingId: x,
      };

      j++;

      this.dataSource.data.push(datatest);
    }

    console.log('datatest', this.dataSource.data);
  }

  onSubmit() {
    console.log(this.selection.selected);
    this.items = this.selection.selected;
    this.dialogRef.close(this.items);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
