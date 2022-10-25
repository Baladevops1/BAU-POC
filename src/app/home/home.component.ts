import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogcardComponent } from '../dialogcard/dialogcard.component';
import { RolesetService } from '../roleset.service';
import { HttpClient } from '@angular/common/http';
import { FilterArrayService } from 'src/app/filterArray.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private rolesetService: RolesetService,
    private http: HttpClient,
    private fa: FilterArrayService,
  ) {}

  activeRole: any;
  activeRoleName: any = '';
  isQuickTodosExpanded: any =
    this.rolesetService.interdataList[0].quickTodosExpand;

  icons: any = this.rolesetService.getIcons();

  ngOnInit(): void {
    let d =
      this.rolesetService.interdataList[0].roles[
        this.rolesetService.interdataList[0].activeRole
      ];

    this.activeRole = this.rolesetService.interdataList[0].activeRole;
    this.activeRoleName = d.name;

    this.isQuickTodosExpanded = this.rolesetService.interdataList[0].quickTodosExpand;
    this.onCategorySelection();
    console.log(this.rolesetService.getStockdatas());
  }

  ngDoCheck() {
    let d =
      this.rolesetService.interdataList[0].roles[
        this.rolesetService.interdataList[0].activeRole
      ];

    this.activeRole = this.rolesetService.interdataList[0].activeRole;
    this.activeRoleName = d.name;

    this.isQuickTodosExpanded =
      this.rolesetService.interdataList[0].quickTodosExpand;
  }

  toggleQuickTodos() {
    this.rolesetService.expandQuickTodos();

    console.log(this.rolesetService.getStockdatas());
  }

  ngAfterViewChecked() {}

  onHoverAllItems(e: any, i: any, j: any) {
    let tip: any = document.getElementById(`description-1-${i}`);

    tip.style.opacity = 1;
    tip.style.display = 'block';
    tip.style.left = e.pageX + 9 + 'px';
    tip.style.top = e.pageY + 14 + 'px';

    var tooltip_rect = tip.getBoundingClientRect();

    if (tooltip_rect.x + tooltip_rect.width > window.innerWidth) {
      tip.style.left = e.pageX - tooltip_rect.width + 'px';
    }
    if (tooltip_rect.y + tooltip_rect.height > window.innerHeight) {
      tip.style.top = e.pageY - tooltip_rect.height + 'px';
    }
  }

  onHoverOutAllItems(e: any, i: any, j: any) {
    let tip: any = document.getElementById(`description-1-${i}`);

    tip.style.opacity = 0;
    tip.style.display = 'none';
  }

  onHover(e: any, i: any, j: any) {
    let tip: any = document.getElementById(`description-2-${i}`);

    tip.style.opacity = 1;
    tip.style.display = 'block';
    tip.style.left = e.pageX + 9 + 'px';
    tip.style.top = e.pageY + 14 + 'px';
  }

  onHoverOut(e: any, i: any, j: any) {
    let tip: any = document.getElementById(`description-2-${i}`);

    tip.style.opacity = 0;
    tip.style.display = 'none';
  }

  onCategorySelection = () => {
    const url = `https://uat.api.dfs.com/article?articleType=Spirits`;
    this.http.get(url).subscribe(data => {
      const newData: any = data;
      if(newData.length != 0) {
        const tableData = newData.article.map(category => 
          ({
            article_Number: category.Article_Number,
            primary_UPC: category.EAN,
            item_description: category.Item_description,
            product_ID: category.Product_ID,
            product_Type: category.Product_Type,
            item_Status: category.Item_Status,
            vendor_Style: category.Vendor_Style,
            vendor_Color_Name: category.Vendor_Color_Name,
            vendor_Size: category.Vendor_Size,
          })
        );
        this.fa.productLookupData = [...tableData];
      }
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogcardComponent, { width: '600px' });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == 'true') {
        this.router.navigate(['/', 'stocktransfer']);
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }
}
