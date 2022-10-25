import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  isPageActive: boolean = false;

  cartList: any = [
    {
      products: [],
      cart: [],
      orders: [],
    },
  ];

  getCartList() {
    return this.cartList;
  }

  getIsPageActive() {
    return this.isPageActive;
  }
}
