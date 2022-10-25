import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-assortment-metrics',
  templateUrl: './product-assortment-metrics.component.html',
  styleUrls: ['./product-assortment-metrics.component.css'],
})
export class ProductAssortmentMetricsComponent implements OnInit {
  constructor() {}

  selectedOption: any;

  filteredBrands: Record<string, string>[] = [];
  selectedBrand: any = '';
  brands: any = [
    { name: 'Burberry' },
    { name: 'Estee Lauder' },
    { name: 'Dior' },
    { name: 'Aveda' },
    { name: 'Becca' },
    { name: 'Clarisonic' },
    { name: 'Gucci' },
    { name: 'La Prairie' },
    { name: 'LVMH Multibrand' },
    { name: "L'Oreal Paris" },
    { name: 'Urban Decay' },
  ];

  filteredCategories: Record<string, string>[] = [];
  selectedCategory: any = '';
  categories: any = [
    { name: 'Foundations' },
    { name: 'Lipstick' },
    { name: 'Blushers' },
    { name: 'Nail Enamel' },
    { name: 'Makeup Accessories' },
    { name: 'Powder' },
    { name: 'Makeup Mixed Sets' },
    { name: 'Eye Color' },
    { name: 'Mascara' },
  ];

  filteredCountries: Record<string, string>[] = [];
  selectedCountry: any = '';
  countries: any = [
    { name: 'Hong Kong' },
    { name: 'Macau' },
    { name: 'Singapore' },
  ];

  filteredChannels: Record<string, string>[] = [];
  selectedChannel: any = '';
  channels: any = [{ name: 'Ecommerce' }, { name: 'Galleria Stores' }];

  filteredExpiries: Record<string, string>[] = [];
  selectedExpiry: any = '';
  expiries: any = [
    { name: '1 month' },
    { name: '2 month' },
    { name: '3 month' },
    { name: '4 month' },
  ];

  showData: boolean = false;

  ngOnInit(): void {}

  selectOptionChange() {
    this.showData = false;
  }

  onSearch() {
    if (this.selectedOption == 1) {
      if (
        this.selectedBrand != '' &&
        this.selectedCategory != '' &&
        this.selectedChannel != ''
      )
        this.showData = !this.showData;
    } else if (this.selectedOption == 2) {
      if (
        this.selectedBrand != '' &&
        this.selectedCategory != '' &&
        this.selectedCountry != '' &&
        this.selectedExpiry != ''
      )
        this.showData = !this.showData;
    }
  }
}
