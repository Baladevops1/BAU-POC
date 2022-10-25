import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-after-initiate',
  templateUrl: './after-initiate.component.html',
  styleUrls: ['./after-initiate.component.css'],
})
export class AfterInitiateComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public dialogRef: MatDialogRef<AfterInitiateComponent>
  ) {}

  ngOnInit(): void {}
  onReceving() {
    // this.router.navigate(['/home']);
  }
}
