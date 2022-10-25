import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockcompletedataService {
  results: any;
  toLocation:any;
  fromLocation: any;
  constructor(private http: HttpClient) { }

  public _url: string ="https://uat.api.dfs.com/fulllocationmaster";
  // public _url: string ="assets/stockfiles.json";
  getAllData(){
      // let headers = new HttpHeaders()
      // headers=headers.set('content-type','application/json')
      // headers=headers.set('Access-Control-Allow-Origin', '*');
      // console.log("headers",headers)
     this.http.get(this._url).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      console.log("data", data);
    });
  }
}
