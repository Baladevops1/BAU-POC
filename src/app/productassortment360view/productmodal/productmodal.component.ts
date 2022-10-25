import { Router } from '@angular/router';
import {
  Component,
  AfterViewInit,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-productmodal',
  templateUrl: './productmodal.component.html',
  styleUrls: ['./productmodal.component.css'],
})
export class ProductmodalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public dialogRef: MatDialogRef<ProductmodalComponent>,
    @Inject(DOCUMENT) document: Document
  ) {}

  slides: string[] = ['1', '2', '3', '4'];

  slides1 = [
    { img: 'http://placehold.it/350x150/000000' },
    { img: 'http://placehold.it/350x150/111111' },
    { img: 'http://placehold.it/350x150/333333' },
    { img: 'http://placehold.it/350x150/666666' },
  ];
  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };

  addSlide() {
    let d = { img: 'http://placehold.it/350x150/777777' };
    this.slides1.push(d);
  }

  removeSlide() {
    this.slides1.length = this.slides1.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  ngOnInit(): void {
    console.log(this.data);

    document.getElementById('modal-select-country')?.focus();
  }

  ngAfterViewInit() {
    document.getElementById('modal-select-country')?.focus();
  }

  ngAfterViewChecked() {
    document.getElementById('modal-select-country')?.focus();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
