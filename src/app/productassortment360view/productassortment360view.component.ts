import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { l1Categories, L1Categories } from './items';
import { FilterArrayService } from '../filterArray.service';
import { RolesetService } from '../roleset.service';
import { CartService } from '../Cart.service';

@Component({
  selector: 'app-productassortment360view',
  templateUrl: './productassortment360view.component.html',
  styleUrls: ['./productassortment360view.component.css'],
})
export class Productassortment360viewComponent implements OnInit {
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private filterArray: FilterArrayService,
    private rolesetService: RolesetService,
    private cartService: CartService
  ) {}

  type: string = 'beauty';
  item: string = '';
  inItem: string = '';
  l1Categories: L1Categories[] = l1Categories;
  l1CategoriesFiltered: any;
  l2CategoriesFiltered: any;

  activeRole: any;

  isCartPageActive: boolean = this.cartService.isPageActive;

  setItems = (l2: any) => {
    this.router.navigate([`/category/`], {
      queryParams: { type: this.type, item: l2 },
    });
  };

  ngOnInit(): void {
    this.isCartPageActive = this.cartService.isPageActive;

    this.activeRole = this.rolesetService.interdataList[0].activeRole;

    console.log(this.filterArray.getFilterArray, l1Categories);

    this.route.queryParams.subscribe((params: any) => {
      this.type = params['type'] || 'Beauty';

      this.item = params['item'] || '';

      this.inItem = params['inItem'] || '';

      if (this.type != '') {
        this.l1CategoriesFiltered = l1Categories.filter(
          (v: any) => v.l1_name === this.type
        )[0];

        if (this.l1CategoriesFiltered.l2_categories.length > 7) {
          this.l1CategoriesFiltered.l2_categories =
            this.l1CategoriesFiltered.l2_categories.slice(0, 7);
        }

        console.log(params, this.type, this.l1CategoriesFiltered);

        if (this.item == '')
          this.setItems(this.l1CategoriesFiltered.l2_categories[0].l2_name);

        console.log(this.item);

        this.l2CategoriesFiltered =
          this.l1CategoriesFiltered.l2_categories.filter(
            (w: any) => w.l2_name === this.item
          )[0];

        console.log(params, this.item, this.l2CategoriesFiltered);
      }
    });
  }

  ngDoCheck() {
    this.isCartPageActive = this.cartService.isPageActive;

    console.log(this.cartService);
  }
}
