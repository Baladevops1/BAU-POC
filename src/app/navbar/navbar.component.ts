import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RolesetService } from '../roleset.service';
import { InterdataService } from '../interdata.service';
import { CartService } from '../Cart.service';

import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    public oktaAuthService: OktaAuthService,
    private router: Router,
    private rolesetService: RolesetService,
    private interdataService: InterdataService,
    private cartService: CartService
  ) {
    this.oktaAuthService.$authenticationState.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth)
    );
  }

  activetab: any;
  currentUrl: any;

  roles: any = this.rolesetService.getStockdatas()[0].roles;

  roleSet: any = '';

  activeRole: any = this.rolesetService.getStockdatas()[0].activeRole;

  orders: any;
  ordersLength: any;

  icons: any = this.rolesetService.getIcons();

  userName: any = '';

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuthService.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuthService.getUser();
      this.userName = userClaims.name as string;
    }

    let d: any = this.rolesetService.getStockdatas()[0];

    this.roles = d.roles;

    this.orders = [];

    if (this.activeRole != 5) {
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
          this.orders.push(this.interdataService.interdataList[0].orders[i]);
        } else if (
          this.interdataService.interdataList[0].orders[i].status ===
            'approval' &&
          this.activeRole == 2
        ) {
          this.orders.push(this.interdataService.interdataList[0].orders[i]);
        }
      }

      this.ordersLength = this.orders.length;
    } else if (this.activeRole == 5) {
      console.log(this.cartService.cartList[0].orders[0]);

      if (this.cartService.cartList[0].orders.length > 0)
        this.orders.push(this.cartService.cartList[0].orders[0]);

      this.ordersLength = this.orders.length > 0 ? this.orders.length : 0;
    }

    console.log(
      this.rolesetService.getStockdatas()[0],
      this.interdataService.getStockdatas()[0],
      this.activeRole,
      this.orders
    );

    this.router.events.subscribe((event: any) => {
      console.log(event);
      this.currentUrl = event.url;
      this.currentUrl = this.currentUrl.replace('/', '');
      console.log(this.currentUrl.replace('/', ''), this.currentUrl);

      if (this.currentUrl == 'home' || this.currentUrl == 'todo') {
        this.onSelectTab(this.currentUrl);
      }
    });
  }

  ngAfterViewChecked() {
    this.icons.forEach((v: any, i: any) => {
      if (v.link === this.router.url && !v.role.includes(this.activeRole)) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngDoCheck() {
    let d: any = this.rolesetService.getStockdatas()[0];

    this.roles = d.roles;

    this.orders = [];

    if (this.activeRole != 5) {
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
          this.orders.push(this.interdataService.interdataList[0].orders[i]);
        } else if (
          this.interdataService.interdataList[0].orders[i].status ===
            'approval' &&
          this.activeRole == 2
        ) {
          this.orders.push(this.interdataService.interdataList[0].orders[i]);
        }
      }

      this.ordersLength = this.orders.length;
    } else if (this.activeRole == 5) {
      console.log(this.cartService.cartList[0].orders[0]);

      if (this.cartService.cartList[0].orders.length > 0)
        this.orders.push(this.cartService.cartList[0].orders[0]);

      this.ordersLength = this.orders.length > 0 ? this.orders.length : 0;
    }

    console.log(this.orders, this.ordersLength);
  }

  onSelectTab(event: any) {
    this.activetab = event;
  }

  onChangeRole(role: any) {
    this.rolesetService.change(role);
  }
}
