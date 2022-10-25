import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FilterArrayService } from 'src/app/filterArray.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface PeriodicElement {
  article_Number: string;
  primary_UPC : string
  item_description: string;
  product_ID: string;
  product_Type: string;
  item_Status: string;
  vendor_Style: string;
  vendor_Color_Name: string;
}

@Component({
  selector: 'app-product-lookup',
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.css']
})
export class ProductLookupComponent implements OnInit, AfterViewInit {

  tableData : any;
  tableFullData: any;
  responseData: any = [];
  supplierData: any;
  supplierResponseData: any = [];
  searcher: any;
  pimUpcResponse : any;
  sapUpcResponse : any;
  pimUpcData : any;
  sapUpcData : any;
  attributeResponse : any;
  attributeData : any;
  isLoading: boolean = false;
  searchProd: any;
  isSearched: boolean = false;
  loaderSelected: string;


  constructor(
    private http: HttpClient,
    public router: Router,
    private fa: FilterArrayService,
    private spinnerService: NgxSpinnerService
  ) { 
    this.loaderSelected = 'ball-fall';

    // ball-fall
  }

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns: string[] = ['Select', 'articleNumber', 'itemDescription', 'productID', 'productType', 'primaryUPC', 'itemStatus', 'vendorStyle', 'vendorColorName', 'vendorSize'];
  dataSource = new MatTableDataSource<PeriodicElement>();;
  selection = new SelectionModel<PeriodicElement>(true, []);
  selectedOption: any;
  color: any  = '#BF2F1A';
  isLoadingValue: number = 50;

  filteredCategory: Record<string, string>[] = [];
  selectedCategory: any = 'Spirits';
  category: any = [
    { name: 'Spirits' },
    { name: 'Wine' },
  ];

  filteredBrand: Record<string, string>[] = [];
  selectedBrand: any = '';
  brand: any = [
    { name: 'HERMES', value: 1180},
    { name: 'ESTEE LAUDER', value: 1135},
  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.onCategorySelection('Spirits')
  }

  onBrandSelection = (brandId: any) => {
    const url = `https://uat.api.dfs.com/article?brandName=${brandId}`;
    if (!brandId) return;
    this.isLoading = true;
    this.spinnerService.show();
    this.http.get(url).subscribe(data => {
      this.responseData = data;
      if(this.responseData.length != 0) {
        this.tableData = this.responseData.article.map(brand => 
          ({
            article_Number: brand.Article_Number,
            primary_UPC: brand.EAN,
            item_description: brand.Item_description,
            product_ID: brand.Product_ID,
            product_Type: brand.Product_Type,
            item_Status: brand.Item_Status,
            vendor_Style: brand.Vendor_Style,
            vendor_Color_Name: brand.Vendor_Color_Name,
            vendor_Size: brand.Vendor_Size,
          })
        );
        this.isLoading = false;
        this.spinnerService.hide();
        this.tableFullData = [...this.tableData];
      }
    });
  }

  ngDoCheck() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  SearchProduct = () => {
    const textInput = this.searchProd;
    if(this.tableFullData.length > 0){
      const searchedProductList = this.tableFullData.filter(function(item) {
        const productList = item.article_Number ? item.article_Number.toUpperCase() : ''.toUpperCase();
        const searchText = textInput.toUpperCase();
        return productList.indexOf(searchText) > -1;
      });
      this.tableData = searchedProductList;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  onCategorySelection = (categoryName: any) => {
    const url = `https://uat.api.dfs.com/article?articleType=${categoryName}`;
    if (!categoryName) return;
    this.isLoading = true;
    this.spinnerService.show();
    this.http.get(url).subscribe(data => {
      this.responseData = data;
      if(this.responseData.length != 0) {
        this.tableData = this.responseData.article.map(category => 
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
        this.isLoading = false;
        this.spinnerService.hide();
        this.tableFullData = [...this.tableData];
      }
    });
  }

  onSearchSingleProduct = () => {
    this.onGetPIMUpc();
    this.onGetSAPUpc();
    this.onGetAttributeDetails();
    const url = `https://uat.api.dfs.com/article?supplierID=${this.searcher}`;
    if (!this.searcher) return;
    this.isSearched = true
    this.http.get(url).subscribe(data => {
      this.supplierResponseData = data;
      if(this.supplierResponseData.length != 0) {
        this.supplierData = this.supplierResponseData.article.map(supplier => 
          ({
            article_Number: supplier.Article_Number,
            primary_UPC: supplier.EAN,
            item_description: supplier.Item_description,
            product_ID: supplier.Product_ID,
            product_Type: supplier.Product_Type,
            item_Status: supplier.Item_Status,
            vendor_Style: supplier.Vendor_Style,
            vendor_Color_Name: supplier.Vendor_Color_Name,
          })
        );
        this.isSearched = false;
        this.fa.productDetails = this.supplierData[0];
        this.router.navigate(['/product-details']);
      }
    });
  }

  onGetSAPUpc = () => {
    const url = `https://uat.api.dfs.com/articleean?article=${this.searcher}`;
    if (!this.searcher) return;
    this.http.get(url).subscribe(data => {
      this.sapUpcResponse = data;
      if(this.sapUpcResponse.length != 0) {
        const arr = this.sapUpcResponse.secondary;
        const obj2 = {secondary : {...arr}}
        const obj3 = {primary : this.sapUpcResponse.primary}
        this.sapUpcData = {...obj2, ...obj3};
      }
      this.fa.sapUpc = this.sapUpcData;
    });
  }


  onGetPIMUpc = () => {
    const url = `https://uat.api.dfs.com/upcean?itemNumber=${this.searcher}`;
    if (!this.searcher) return;
    this.http.get(url).subscribe(data => {
      this.pimUpcResponse = data;
      if(this.pimUpcResponse.length != 0) {
        const arr = this.pimUpcResponse.UPC.secondaryUPC;
        const obj2 = {secondary : {...arr}}
        const obj3 = {primary : this.pimUpcResponse.UPC.primaryUPC}
        this.pimUpcData = {...obj2, ...obj3};
      }
      this.fa.pimUpc = this.pimUpcData;
    });
  }

  onGetAttributeDetails = () => {
    const url = `https://uat.api.dfs.com/articleattribute?articleID=${this.searcher}`;
    if (!this.searcher) return;
    this.http.get(url).subscribe(data => {
      this.attributeResponse = data;
      if(this.attributeResponse.length != 0) {
        let newArray: any = [];
        this.attributeResponse.attriuteList.filter((item) => {
            if(item.keyValue != ''){
              newArray.push(item);
            }
        });
        this.attributeData = newArray;
      }
      this.fa.attributeDetails = this.attributeData;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }
}
