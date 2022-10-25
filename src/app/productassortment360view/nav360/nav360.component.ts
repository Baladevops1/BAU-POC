import { Component, OnInit, Input } from '@angular/core';
import { FilterArrayService } from 'src/app/filterArray.service';
import { RolesetService } from 'src/app/roleset.service';
import { CartService } from 'src/app/Cart.service';

@Component({
  selector: 'app-nav360',
  templateUrl: './nav360.component.html',
  styleUrls: ['./nav360.component.css'],
})
export class Nav360Component implements OnInit {
  constructor(
    private fa: FilterArrayService,
    private rolesetService: RolesetService,
    private cartService: CartService
  ) {}

  @Input() type: any;
  @Input() item: any;
  @Input() inItem: any;
  @Input() l1Headers: any;
  @Input() l1Categories: any;
  @Input() l1CategoriesFiltered: any;
  @Input() setItems: any;

  activeRole: any;

  cartCount: any;

  ngOnInit(): void {
    this.cartCount = this.cartService.cartList[0].cart.length;

    this.activeRole = this.rolesetService.interdataList[0].activeRole;

    window.addEventListener('scroll', function () {
      navbarScroll();
    });

    const navbarScroll = () => {
      var y = window.scrollY;
      if (y > 10) {
        var header = document.getElementsByClassName('nav2')[0];
        header.classList.add('width1');
      } else if (y < 10) {
        var header = document.getElementsByClassName('nav2')[0];
        header.classList.remove('width1');
      }
    };
  }

  ngDoCheck() {
    this.cartCount = this.cartService.cartList[0].cart.filter(
      (v: any, i: any) => v.status == 'moved to cart'
    ).length;
  }

  cartPageActive() {
    this.cartService.isPageActive = true;
  }

  searchAll(e: any) {
    console.log(e);

    this.fa.filterArray.search = e.target.value;
  }
}
