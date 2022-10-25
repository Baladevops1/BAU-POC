import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AfterInitiateComponent } from '../after-initiate/after-initiate.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogcardComponent } from '../dialogcard/dialogcard.component';
import { StockdataService } from '../stockdata.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-onedfsmobile',
  templateUrl: './onedfsmobile.component.html',
  styleUrls: ['./onedfsmobile.component.css'],
})
export class OnedfsmobileComponent implements OnInit {
  currentDate = new Date();
  randNumber = '5000';
  selectedFrom: any;
  selectedTo: any;
  searchTextData: any;
  fromLocations = [
    { name: '203-TST EAST  MAIN SHOP', abbrev: '203' },
    { name: '207-CANTON ROAD MAIN SHOP', abbrev: '207' },
    { name: '215-TSTE SELECT LITE E-SHOP', abbrev: '215' },
    { name: '218-HKG BEST OUTLET', abbrev: '218' },
    { name: '229-OCEAN TERMINAL SEAPAX', abbrev: '229' },
  ];

  toLocations = [
    { name: '203-TST EAST  MAIN SHOP', abbrev: '203' },
    { name: '207-CANTON ROAD MAIN SHOP', abbrev: '207' },
    { name: '215-TSTE SELECT LITE E-SHOP', abbrev: '215' },
    { name: '218-HKG BEST OUTLET', abbrev: '218' },
    { name: '229-OCEAN TERMINAL SEAPAX', abbrev: '229' },
  ];

  items: any;
  transferIdData: any;
  constructor(
    private renderer: Renderer2,
    private stockdataService: StockdataService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  randomNumber = Math.floor(Math.random() * 50000 + 1);
  x = this.randomNumber.toString();
  ngOnInit(): void {
    // this.openStock();
  }
  downloadFile() {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute(
      'href',
      'assets/Vendor Maintenance Form_New (Merchandise).xlsx'
    );
    link.setAttribute(
      'download',
      `Vendor Maintenance Form_New (Merchandise).xlsx`
    );
    link.click();
    link.remove();
  }
}
