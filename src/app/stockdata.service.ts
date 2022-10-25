import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stockdata } from './stockdata.interface';

@Injectable({
  providedIn: 'root'
})
export class StockdataService {

  stockdataList : Stockdata[] = [];
  constructor(private http: HttpClient) {
  }

  getStockdatas(){
    return this.stockdataList;
  }
  // getStockdata(id){
  //   let Stockdata: Stockdata;
  //   this.stockdataList.map(val=>{
  //     if(val.id == id) Stockdata = val;
  //   });
  //   return Stockdata;
  // }
  // StockdataEdit(Stockdata){
  //   let present: Boolean = false;
  //   this.stockdataList.map((val, index)=>{
  //     if(val.id == Stockdata.id) {this.stockdataList[index] = Stockdata;
  //       present=true}
  //   });
  //   return present;
  // }
}
