import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialogcard',
  templateUrl: './dialogcard.component.html',
  styleUrls: ['./dialogcard.component.css']
})
export class DialogcardComponent implements OnInit {
  constructor(public router: Router, public dialogRef: MatDialogRef<DialogcardComponent>) { }

  ngOnInit(): void {

  }
  onInitiate(){
    this.router.navigate(['/stocktransfer']);
  }
  onReceving(){
    this.router.navigate(['/stockreceving']);
  }
}
