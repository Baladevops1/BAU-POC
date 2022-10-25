import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductmodalComponent } from '../productmodal/productmodal.component';
import { FilterArrayService } from 'src/app/filterArray.service';
import { RolesetService } from 'src/app/roleset.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/Cart.service';

export interface PeriodicElement {
  position: number;
  id: string;
  toLocation: string;
  fromLocation: string;
  toDivision: string;
  shipmentDeliveryDate: string;
  transferInitiatedDate: string;
  reference: string;
  gridData: any;
  totalQuantity: string;
  totalItem: string;
}

@Component({
  selector: 'app-categorytypefilter',
  templateUrl: './categorytypefilter.component.html',
  styleUrls: [
    '../categoriestype/categoriestype.component.css',
    './categorytypefilter.component.css',
  ],
})
export class CategorytypefilterComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private fa: FilterArrayService,
    private rolesetService: RolesetService,
    private cartService: CartService
  ) {}

  @Input() type: any;
  @Input() item: any;
  @Input() inItem: any;
  @Input() l1CategoriesFiltered: any;
  @Input() l2CategoriesFiltered: any;
  @Input() attributes: any;
  @Input() filterArray: any;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  math: any = Math;

  displayedColumns: string[] = [
    'image',
    'product_id',
    'product_desc',
    'brand',
    'store',
    'vsp',
    'rp',
    'qty',
    'wsp',
    'cart',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();

  selectedSort: any = 'select';
  sortitems: any = [
    { name: 'Price low to high' },
    { name: 'Price high to low' },
  ];
  filteredSort: Record<string, string>[] = [];

  allCountries: any = [
    {
      name: 'APAC',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'Bali', completed: false, color: 'primary' },
        { name: 'Siem Reap', completed: false, color: 'accent' },
        { name: 'Guam', completed: false, color: 'accent' },
        { name: 'Macau', completed: false, color: 'accent' },
        { name: 'Saipan', completed: false, color: 'accent' },
        { name: 'Okinawa', completed: false, color: 'accent' },
        { name: 'Hong Kong', completed: false, color: 'accent' },
        { name: 'Singapore', completed: false, color: 'accent' },
      ],
    },
    {
      name: 'Europe',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'Venice', completed: false, color: 'primary' },
        { name: 'Paris', completed: false, color: 'accent' },
      ],
    },
    {
      name: 'North America',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'Hawaii', completed: false, color: 'primary' },
        { name: 'Los Angeles', completed: false, color: 'accent' },
        { name: 'New York City', completed: false, color: 'accent' },
        { name: 'San Fransisco', completed: false, color: 'accent' },
      ],
    },
    {
      name: 'Middle East',
      completed: false,
      color: 'primary',
      subtasks: [{ name: 'Abu Dhabi', completed: false, color: 'primary' }],
    },
    {
      name: 'Oceania',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'Auckland', completed: false, color: 'primary' },
        { name: 'Cairns', completed: false, color: 'primary' },
        { name: 'Sydney', completed: false, color: 'primary' },
      ],
    },
  ];

  countries: any = JSON.parse(JSON.stringify(this.allCountries));

  allBrands: any = [
    'Burberry',
    'Estee Lauder',
    'Dior',
    'Aveda',
    'Becca',
    'Clarisonic',
    'Gucci',
    'La Prairie',
    'LVMH Multibrand',
    "L'Oreal Paris",
    'Urban Decay',
  ];

  brands: any = JSON.parse(JSON.stringify(this.allBrands));

  innerItem: any = '';

  value: number = 10;
  highValue: number = 190;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      return '$' + value;
    },
    showSelectionBar: true,
    getSelectionBarColor: (value: number): string => {
      return '#9e3753';
    },
  };

  capitalize = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  slides: any = [];

  slopes: any = [];

  p: number = 1;

  items1: any = [
    {
      csku: '60265035',
      name: 'Ultimate Glow Cushion Foundation',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_3607225727891374933_1_en_9.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590973470',
      styleId: '100104049',
      colors: [
        {
          id: '60265035',
          hex: '#EBBE9F',
          csku: '60265035',
          rsku: '590973470',
        },
        {
          id: '60265027',
          hex: '#EBC8AA',
          csku: '60265027',
          rsku: '590973432',
        },
        {
          id: '60265052',
          hex: '#EEC29F',
          csku: '60265052',
          rsku: '590973555',
        },
        {
          id: '60265051',
          hex: '#EEC79E',
          csku: '60265051',
          rsku: '590973524',
        },
        {
          id: '60265039',
          hex: '#EEC295',
          csku: '60265039',
          rsku: '590973463',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '481.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Ultimate Glow Cushion Foundation',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: null,
    },
    {
      csku: '60265023',
      name: 'Ultimate Glow Fluid Foundation',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_3607225727891374891_1_en_11.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590973449',
      styleId: '100104045',
      colors: [
        {
          id: '60265048',
          hex: '#ECC5A8',
          csku: '60265048',
          rsku: '590973517',
        },
        {
          id: '60265023',
          hex: '#F0C4A1',
          csku: '60265023',
          rsku: '590973449',
        },
        {
          id: '60265024',
          hex: '#E9BE9C',
          csku: '60265024',
          rsku: '590973425',
        },
        {
          id: '60265031',
          hex: '#E8C1A4',
          csku: '60265031',
          rsku: '590973418',
        },
        {
          id: '60265028',
          hex: '#E5BEA1',
          csku: '60265028',
          rsku: '590973456',
        },
        {
          id: '60265036',
          hex: '#EAC1A3',
          csku: '60265036',
          rsku: '590973494',
        },
        {
          id: '60265043',
          hex: '#DCB092',
          csku: '60265043',
          rsku: '590973548',
        },
        {
          id: '60265044',
          hex: null,
          csku: '60265044',
          rsku: '590973531',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '481.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Ultimate Glow Fluid Foundation',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: null,
    },
    {
      csku: '60221164',
      name: 'Burberry Kisses',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_3607262080494575372_1_en_8.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590973760',
      styleId: '100086840',
      colors: [
        {
          id: '60221164',
          hex: '#8D3335',
          csku: '60221164',
          rsku: '590973760',
        },
        {
          id: '60221209',
          hex: '#B72434',
          csku: '60221209',
          rsku: '590973814',
        },
        {
          id: '60221218',
          hex: '#FC473C',
          csku: '60221218',
          rsku: '590973807',
        },
        {
          id: '60221172',
          hex: '#CB1F37',
          csku: '60221172',
          rsku: '590973845',
        },
        {
          id: '60221236',
          hex: '#DC2C2E',
          csku: '60221236',
          rsku: '590973876',
        },
        {
          id: '60221171',
          hex: '#AF3C37',
          csku: '60221171',
          rsku: '590973777',
        },
        {
          id: '60221229',
          hex: '#934F44',
          csku: '60221229',
          rsku: '590973869',
        },
        {
          id: '60221213',
          hex: '#D36D5F',
          csku: '60221213',
          rsku: '590973784',
        },
        {
          id: '60221161',
          hex: '#BA4D46',
          csku: '60221161',
          rsku: '590973746',
        },
        {
          id: '60221205',
          hex: '#D5231F',
          csku: '60221205',
          rsku: '590973791',
        },
        {
          id: '60221179',
          hex: '#B0333B',
          csku: '60221179',
          rsku: '590973821',
        },
        {
          id: '60221106',
          hex: '#9B3735',
          csku: '60221106',
          rsku: '590973722',
        },
        {
          id: '60221145',
          hex: '#B31C23',
          csku: '60221145',
          rsku: '590973739',
        },
        {
          id: '60221233',
          hex: '#BC6063',
          csku: '60221233',
          rsku: '590973883',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '264.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Burberry Kisses',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '60284102',
      name: 'Kisses Matte',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_3644468729344966699_1_en_3.jpeg',
      tags: null,
      soldOut: false,
      rsku: '591056325',
      styleId: '100111102',
      colors: [
        {
          id: '60284105',
          hex: '#9f3935',
          csku: '60284105',
          rsku: '591056332',
        },
        {
          id: '60284108',
          hex: '#bd3f4a',
          csku: '60284108',
          rsku: '591056349',
        },
        {
          id: '60284102',
          hex: '#8e3b33',
          csku: '60284102',
          rsku: '591056325',
        },
        {
          id: '60284103',
          hex: '#ad1a12',
          csku: '60284103',
          rsku: '591056363',
        },
        {
          id: '60284107',
          hex: '#6b2d30',
          csku: '60284107',
          rsku: '591056387',
        },
        {
          id: '60284093',
          hex: '#b30e1f',
          csku: '60284093',
          rsku: '591056271',
        },
        {
          id: '60284106',
          hex: '#922f2a',
          csku: '60284106',
          rsku: '591056394',
        },
        {
          id: '60284104',
          hex: '#994c56',
          csku: '60284104',
          rsku: '591056417',
        },
        {
          id: '60284099',
          hex: '#8e3b33',
          csku: '60284099',
          rsku: '591056264',
        },
        {
          id: '60284096',
          hex: '#b35361',
          csku: '60284096',
          rsku: '591056219',
        },
        {
          id: '60284098',
          hex: '#bd4d4c',
          csku: '60284098',
          rsku: '591056240',
        },
        {
          id: '60284089',
          hex: '#98142b',
          csku: '60284089',
          rsku: '591056189',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '264.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Kisses Matte',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '60363746',
      name: 'Her Eau de Toilette for Women',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_4265046835960979578_1_en_3.jpeg',
      tags: null,
      soldOut: false,
      rsku: '591345191',
      styleId: '100141674',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '714.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Her Eau de Toilette for Women',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '41443706',
      name: 'Mr. Burberry Eau de Parfum',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2605756830408523937_1_en_37.jpeg',
      tags: null,
      soldOut: false,
      rsku: '18407346',
      styleId: '704125',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '869.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Mr. Burberry Eau de Parfum',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '39912837',
      name: 'Mr. Burberry Eau de Toilette',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2605721027561136128_1_en_62.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17723636',
      styleId: '630199',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '784.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Mr. Burberry Eau de Toilette',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '60031350',
      name: 'Lip Velvet Crush',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608369132597174352_1_en_26.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590008751',
      styleId: '100007143',
      colors: [
        {
          id: '60031350',
          hex: '#BF4F4C',
          csku: '60031350',
          rsku: '590008751',
        },
        {
          id: '60031338',
          hex: '#A63128',
          csku: '60031338',
          rsku: '590008745',
        },
        {
          id: '60031324',
          hex: '#C1584B',
          csku: '60031324',
          rsku: '590008724',
        },
        {
          id: '60031223',
          hex: '#CF1F2E',
          csku: '60031223',
          rsku: '590008633',
        },
        {
          id: '60031271',
          hex: '#E98671',
          csku: '60031271',
          rsku: '590008679',
        },
        {
          id: '60031346',
          hex: '#DA3239',
          csku: '60031346',
          rsku: '590008746',
        },
        {
          id: '60031351',
          hex: '#EB1209',
          csku: '60031351',
          rsku: '590008750',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '179.20',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '256.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Lip Velvet Crush',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: [
        {
          id: '4607311508345454593',
          content: '30% off',
          contentEn: '30% off',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '60031340',
      name: 'Liquid Lip Velvet',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608369201316651039_1_en_27.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590008741',
      styleId: '100007145',
      colors: [
        {
          id: '60031340',
          hex: '#932838',
          csku: '60031340',
          rsku: '590008741',
        },
        {
          id: '60031269',
          hex: '#EA8482',
          csku: '60031269',
          rsku: '590008674',
        },
        {
          id: '60031261',
          hex: '#F0544C',
          csku: '60031261',
          rsku: '590008668',
        },
        {
          id: '60031252',
          hex: '#E19798',
          csku: '60031252',
          rsku: '590008659',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '179.20',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '256.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Liquid Lip Velvet',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: [
        {
          id: '4607311508345454593',
          content: '30% off',
          contentEn: '30% off',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '43153063',
      name: 'Mr Burberry Indigo Eau de Toilette 50ml',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608330546610987048_1_en_62.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19039890',
      styleId: '772103',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '559.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Mr Burberry Indigo Eau de Toilette 50ml',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '60111187',
      name: 'London Eau de Toilette For Men',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611303419894071575_1_en_44.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590170015',
      styleId: '100037083',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '445.90',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '637.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'London Eau de Toilette For Men',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: [
        {
          id: '4607311508345454593',
          content: '30% off',
          contentEn: '30% off',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '60119212',
      name: 'Matte Glow Liquid Foundation',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611303969649885657_1_en_12.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590220215',
      styleId: '100040236',
      colors: [
        {
          id: '60119212',
          hex: '#F7BE93',
          csku: '60119212',
          rsku: '590220215',
        },
        {
          id: '60119287',
          hex: '#DBA87D',
          csku: '60119287',
          rsku: '590220673',
        },
        {
          id: '60119187',
          hex: '#DEAB7E',
          csku: '60119187',
          rsku: '590220130',
        },
        {
          id: '60119219',
          hex: '#E2B189',
          csku: '60119219',
          rsku: '590220253',
        },
        {
          id: '60119262',
          hex: '#E2B284',
          csku: '60119262',
          rsku: '590220062',
        },
        {
          id: '60119286',
          hex: null,
          csku: '60119286',
          rsku: '590220666',
        },
        {
          id: '60119266',
          hex: null,
          csku: '60119266',
          rsku: '590220604',
        },
        {
          id: '60221104',
          hex: '#FBCBA3',
          csku: '60221104',
          rsku: '590976341',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '450.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Matte Glow Liquid Foundation',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: null,
    },
    {
      csku: '60123554',
      name: 'Brit for Him Eau de Toilette 100ml',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611307405623722211_1_en_45.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590247083',
      styleId: '100042698',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '494.90',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '707.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Brit for Him Eau de Toilette 100ml',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: [
        {
          id: '4607311508345454593',
          content: '30% off',
          contentEn: '30% off',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '60119256',
      name: 'Burberry Kisses Lip Lacquer',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611304863003082843_1_en_23.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590220499',
      styleId: '100040204',
      colors: [
        {
          id: '60119256',
          hex: '#96423B',
          csku: '60119256',
          rsku: '590220499',
        },
        {
          id: '60119241',
          hex: '#DC9090',
          csku: '60119241',
          rsku: '590220444',
        },
        {
          id: '60119177',
          hex: '#FE9288',
          csku: '60119177',
          rsku: '590219981',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '259.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Burberry Kisses Lip Lacquer',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '40146764',
      name: 'My Burberry Black Eau de Parfum',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2831218767790252083_1_en_39.jpeg',
      tags: null,
      soldOut: false,
      rsku: '18001081',
      styleId: '652863',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,166.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'My Burberry Black Eau de Parfum',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '60033732',
      name: 'Effortless Eyebrow Definer',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2833822754922209339_1_en_8.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590014076',
      styleId: '100008435',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '248.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Effortless Eyebrow Definer',
      specName: null,
      categoryNameEn: 'Eye Color',
      promotionTags: null,
    },
    {
      csku: '60123555',
      name: 'Brit For Her Eau de Parfum',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2918306410902003769_1_en_29.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590247090',
      styleId: '100042699',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '625.80',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '894.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Brit For Her Eau de Parfum',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: [
        {
          id: '4607311508345454593',
          content: '30% off',
          contentEn: '30% off',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '60031308',
      name: 'Cat Lashes Mascara',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2918294110115668255_1_en_19.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590008710',
      styleId: '100007113',
      colors: [
        {
          id: '60031308',
          hex: '#191816',
          csku: '60031308',
          rsku: '590008710',
        },
        {
          id: '60031348',
          hex: '#1F130E',
          csku: '60031348',
          rsku: '590008749',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '256.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Cat Lashes Mascara',
      specName: null,
      categoryNameEn: 'Mascara',
      promotionTags: null,
    },
    {
      csku: '60123550',
      name: 'Brit Sheer Eau de Toilette',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2918306376542265403_1_en_37.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590247106',
      styleId: '100042694',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '532.70',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '761.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'Brit Sheer Eau de Toilette',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: [
        {
          id: '4607311508345454593',
          content: '30% off',
          contentEn: '30% off',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '60123548',
      name: 'London Eau de Parfum For Women 100ml',
      brand: 'BURBERRY BEAUTY',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_3148837509204566020_1_en_30.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590247113',
      styleId: '100042692',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '603.40',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '862.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '3870138508786147328',
      brandNameEn: 'BURBERRY BEAUTY',
      nameEn: 'London Eau de Parfum For Women 100ml',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: [
        {
          id: '4607311508345454593',
          content: '30% off',
          contentEn: '30% off',
          clickable: false,
          type: '1',
        },
      ],
    },

    {
      csku: '28917276',
      name: 'Double Wear Zero-Smudge Lengthening Mascara',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602580135157448869_1_en_24.jpeg',
      tags: null,
      soldOut: false,
      rsku: '11967064',
      styleId: '178831',
      colors: [
        {
          id: '28917276',
          hex: '#000000',
          csku: '28917276',
          rsku: '11967064',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '345.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Double Wear Zero-Smudge Lengthening Mascara',
      specName: null,
      categoryNameEn: 'Mascara',
      promotionTags: null,
    },
    {
      csku: '36478931',
      name: 'Modern Muse Eau de Parfum Spray',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602608516301340807_1_en_22.jpeg',
      tags: null,
      soldOut: false,
      rsku: '16809808',
      styleId: '483113',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '965.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Modern Muse Eau de Parfum Spray',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '1099670',
      name: 'Double Wear Stay-in-Place Makeup SPF10/PA++',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602651740852199424_1_en_45.jpeg',
      tags: null,
      soldOut: false,
      rsku: '10499333',
      styleId: '5794',
      colors: [
        {
          id: '1099688',
          hex: '#F2BF9B',
          csku: '1099688',
          rsku: '10499341',
        },
        {
          id: '28785269',
          hex: '#EBBA8F',
          csku: '28785269',
          rsku: '11917861',
        },
        {
          id: '1099670',
          hex: '#F2CBB0',
          csku: '1099670',
          rsku: '10499333',
        },
        {
          id: '30035521',
          hex: '#ba8d4c',
          csku: '30035521',
          rsku: '15103997',
        },
        {
          id: '60054504',
          hex: '#e6bb98',
          csku: '60054504',
          rsku: '590018790',
        },
        {
          id: '28785277',
          hex: '#BB8141',
          csku: '28785277',
          rsku: '11917879',
        },
        {
          id: '35137033',
          hex: '#F0C79E',
          csku: '35137033',
          rsku: '17814773',
        },
        {
          id: '42247312',
          hex: '#d0a26e',
          csku: '42247312',
          rsku: '18699694',
        },
        {
          id: '60054492',
          hex: '#d6ab74',
          csku: '60054492',
          rsku: '590018792',
        },
        {
          id: '1099696',
          hex: '#e6bb98',
          csku: '1099696',
          rsku: '10499358',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '383.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '425.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Double Wear Stay-in-Place Makeup SPF10/PA++',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: [
        {
          id: '4617831498161061889',
          content: 'Save HKD42',
          contentEn: 'Save HKD42',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '35906130',
      name: 'Re-Nutriv Ultra Radiance Powder Makeup SPF16/PA+++',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602700497320943616_1_en_6.jpeg',
      tags: null,
      soldOut: false,
      rsku: '15836786',
      styleId: '462707',
      colors: [
        {
          id: '35906130',
          hex: '#e2c8b0',
          csku: '35906130',
          rsku: '15836786',
        },
        {
          id: '35906155',
          hex: '#dfc7ad',
          csku: '35906155',
          rsku: '15836802',
        },
        {
          id: '35906148',
          hex: '#e3ccb9',
          csku: '35906148',
          rsku: '15836794',
        },
        {
          id: '35906122',
          hex: '#e6c6b4',
          csku: '35906122',
          rsku: '15836778',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '825.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Re-Nutriv Ultra Radiance Powder Makeup SPF16/PA+++',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: null,
    },
    {
      csku: '37246493',
      name: 'Pure Color Envy Sculpting Lipstick',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2605724841492103619_1_en_24.jpeg',
      tags: null,
      soldOut: false,
      rsku: '18153692',
      styleId: '513088',
      colors: [
        {
          id: '37246493',
          hex: '#ab646b',
          csku: '37246493',
          rsku: '18153692',
        },
        {
          id: '40640195',
          hex: '#7c2a1f',
          csku: '40640195',
          rsku: '18135368',
        },
        {
          id: '37246451',
          hex: '#c26074',
          csku: '37246451',
          rsku: '17117714',
        },
        {
          id: '37246428',
          hex: '#ff4635',
          csku: '37246428',
          rsku: '17117557',
        },
        {
          id: '37246543',
          hex: '#945d55',
          csku: '37246543',
          rsku: '17117631',
        },
        {
          id: '37246436',
          hex: '#d10404',
          csku: '37246436',
          rsku: '17117698',
        },
        {
          id: '38584371',
          hex: '#cb6860',
          csku: '38584371',
          rsku: '17117805',
        },
        {
          id: '38584405',
          hex: '#cb554d',
          csku: '38584405',
          rsku: '17117862',
        },
        {
          id: '38584348',
          hex: '#cc2925',
          csku: '38584348',
          rsku: '17117748',
        },
        {
          id: '40640237',
          hex: '#b62127',
          csku: '40640237',
          rsku: '18135442',
        },
        {
          id: '60155415',
          hex: '#ec1b54',
          csku: '60155415',
          rsku: '590413372',
        },
        {
          id: '45368958',
          hex: '#bf2756',
          csku: '45368958',
          rsku: '19572064',
        },
        {
          id: '60155382',
          hex: '#c42136',
          csku: '60155382',
          rsku: '590413174',
        },
        {
          id: '60155372',
          hex: '#eb1d48',
          csku: '60155372',
          rsku: '590413105',
        },
        {
          id: '60155396',
          hex: '#be5157',
          csku: '60155396',
          rsku: '590413235',
        },
        {
          id: '60179500',
          hex: '#ad4649',
          csku: '60179500',
          rsku: '590449647',
        },
        {
          id: '60090108',
          hex: '#9e434c',
          csku: '60090108',
          rsku: '590270043',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '305.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Pure Color Envy Sculpting Lipstick',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '39382122',
      name: 'Re-Nutriv Ultimate Diamond Transformative Energy Eye Crème',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2579759324646277357_1_en_29.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17519653',
      styleId: '610921',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '2,870.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Re-Nutriv Ultimate Diamond Transformative Energy Eye Crème',
      specName: null,
      categoryNameEn: 'Eye Treatment',
      promotionTags: null,
    },
    {
      csku: '40522567',
      name: 'The Brow Multi-Tasker',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2605747140962304550_1_en_40.jpeg',
      tags: null,
      soldOut: false,
      rsku: '18095208',
      styleId: '675359',
      colors: [
        {
          id: '40522567',
          hex: '#35312a',
          csku: '40522567',
          rsku: '18095208',
        },
        {
          id: '40522559',
          hex: '#554130',
          csku: '40522559',
          rsku: '18095182',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '265.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'The Brow Multi-Tasker',
      specName: null,
      categoryNameEn: 'Eye Color',
      promotionTags: null,
    },
    {
      csku: '311500210',
      name: 'White Linen Eau de Parfum Spray',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602547733924168042_1_en_22.jpeg',
      tags: null,
      soldOut: false,
      rsku: '311500210',
      styleId: '70000004623',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '605.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'White Linen Eau de Parfum Spray',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '35021294',
      name: 'Double Wear Stay-in-Place Flawless Finish Concealer',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602548799076057284_1_en_29.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590117768',
      styleId: '430534',
      colors: [
        {
          id: '35021294',
          hex: '#d1b590',
          csku: '35021294',
          rsku: '590117768',
        },
        {
          id: '35021302',
          hex: '#c3ab7c',
          csku: '35021302',
          rsku: '590117775',
        },
        {
          id: '60126468',
          hex: null,
          csku: '60126468',
          rsku: '590334295',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '330.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Double Wear Stay-in-Place Flawless Finish Concealer',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: null,
    },
    {
      csku: '19204251',
      name: 'Re-Nutriv Softening Lotion',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602576802262819014_1_en_14.jpeg',
      tags: null,
      soldOut: false,
      rsku: '8796033',
      styleId: '70000006031',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '565.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Re-Nutriv Softening Lotion',
      specName: null,
      categoryNameEn: 'Toners',
      promotionTags: null,
    },
    {
      csku: '44702223',
      name: 'Beautiful Belle Eau de Parfum Spray',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602569071321686206_1_en_27.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590022366',
      styleId: '806712',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '930.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Beautiful Belle Eau de Parfum Spray',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '32188922',
      name: 'Re-Nutriv Ultimate Lift Age-Correcting Eye Creme',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602584498844221697_1_en_6.jpeg',
      tags: null,
      soldOut: false,
      rsku: '13676606',
      styleId: '318312',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,010.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Re-Nutriv Ultimate Lift Age-Correcting Eye Creme',
      specName: null,
      categoryNameEn: 'Eye Treatment',
      promotionTags: null,
    },
    {
      csku: '43975002',
      name: 'Nutritious Super-Pomegranate Radiant Energy Moisture Crème',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608336834443108675_1_en_36.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19285949',
      styleId: '795862',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '655.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Nutritious Super-Pomegranate Radiant Energy Moisture Crème',
      specName: null,
      categoryNameEn: 'Face Moisturizers',
      promotionTags: null,
    },
    {
      csku: '39997086',
      name: 'Advanced Night Micro Cleansing Foam',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602631090649448552_1_en_34.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17762642',
      styleId: '640361',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '320.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Advanced Night Micro Cleansing Foam',
      specName: null,
      categoryNameEn: 'Cleansers',
      promotionTags: null,
    },
    {
      csku: '38590519',
      name: 'Re-Nutriv Ultimate Diamond Transformative Energy Crème',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602614941572415584_1_en_25.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17119694',
      styleId: '569770',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '4,250.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Re-Nutriv Ultimate Diamond Transformative Energy Crème',
      specName: null,
      categoryNameEn: 'Face Moisturizers',
      promotionTags: null,
    },
    {
      csku: '40181208',
      name: 'Advanced Night Repair Intensive Recovery Ampoules',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602617037516447792_1_en_21.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17916628',
      styleId: '657071',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,095.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Advanced Night Repair Intensive Recovery Ampoules',
      specName: null,
      categoryNameEn: 'Repair items',
      promotionTags: null,
    },
    {
      csku: '44764249',
      name: 'Futurist Aqua Brilliance™ Makeup SPF20/PA+++',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608344908981625438_1_en_38.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19416767',
      styleId: '100060350',
      colors: [
        {
          id: '44764272',
          hex: '#c39b70',
          csku: '44764272',
          rsku: '19416825',
        },
        {
          id: '44764264',
          hex: '#c9a16f',
          csku: '44764264',
          rsku: '19416809',
        },
        {
          id: '44764249',
          hex: '#ddae74',
          csku: '44764249',
          rsku: '19416767',
        },
        {
          id: '44764231',
          hex: '#ceab89',
          csku: '44764231',
          rsku: '19416742',
        },
        {
          id: '44764280',
          hex: '#bc9156',
          csku: '44764280',
          rsku: '19416841',
        },
        {
          id: '44764256',
          hex: '#d5b083',
          csku: '44764256',
          rsku: '19416783',
        },
        {
          id: '60167841',
          hex: '#cda17b',
          csku: '60167841',
          rsku: '590423692',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '440.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: {
        isoCode: 'HKD',
        amount: '545.00',
        name: '',
        displayLine: true,
        display: true,
        dutyPaid: false,
      },
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Futurist Aqua Brilliance™ Makeup SPF20/PA+++',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: [
        {
          id: '4617852148363853825',
          content: 'Save HKD105',
          contentEn: 'Save HKD105',
          clickable: false,
          type: '1',
        },
      ],
    },
    {
      csku: '35906189',
      name: 'Re-Nutriv Ultra Radiance Powder Makeup SPF16/PA+++ (Compact Case)',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602700634759897160_1_en_8.jpeg',
      tags: null,
      soldOut: false,
      rsku: '15836836',
      styleId: '462710',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '290.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn:
        'Re-Nutriv Ultra Radiance Powder Makeup SPF16/PA+++ (Compact Case)',
      specName: null,
      categoryNameEn: 'Fragrance Accessories',
      promotionTags: null,
    },
    {
      csku: '39924411',
      name: 'Advanced Night Micro Cleansing Balm',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602629441382006945_1_en_19.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17730410',
      styleId: '633109',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '420.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Advanced Night Micro Cleansing Balm',
      specName: null,
      categoryNameEn: 'Cleansers',
      promotionTags: null,
    },
    {
      csku: '39799556',
      name: 'Double Wear Infinite Waterproof Eyeliner',
      brand: 'Estée Lauder',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2605719859330040033_1_en_10.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17677642',
      styleId: '624667',
      colors: [
        {
          id: '39799556',
          hex: '#424146',
          csku: '39799556',
          rsku: '17677642',
        },
        {
          id: '39799564',
          hex: '#4d3c41',
          csku: '39799564',
          rsku: '17677667',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '265.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '2578455647453110512',
      brandNameEn: 'Estée Lauder',
      nameEn: 'Double Wear Infinite Waterproof Eyeliner',
      specName: null,
      categoryNameEn: 'Eye Color',
      promotionTags: null,
    },

    {
      csku: '14110755',
      name: "J'adore Eau de Parfum",
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2579760217999474933_1_en_40.jpeg',
      tags: null,
      soldOut: false,
      rsku: '7617623',
      styleId: '70000002637',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,025.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: "J'adore Eau de Parfum",
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '29619244',
      name: 'Miss Dior Blooming Bouquet Eau de Toilette',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2579759049768370323_1_en_39.jpeg',
      tags: null,
      soldOut: false,
      rsku: '12233482',
      styleId: '215256',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '840.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Miss Dior Blooming Bouquet Eau de Toilette',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '39747530',
      name: 'Prestige Eye Concentrate',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2579759359006015575_1_en_37.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17633843',
      styleId: '622127',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,350.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Prestige Eye Concentrate',
      specName: null,
      categoryNameEn: 'Eye Treatment',
      promotionTags: null,
    },
    {
      csku: '39200761',
      name: 'Sauvage Eau de Toilette',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602626383365292168_1_en_45.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17430554',
      styleId: '600012',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '940.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Sauvage Eau de Toilette',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '39974739',
      name: "J'adore Eau de Toilette",
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2602629716259913864_1_en_44.jpeg',
      tags: null,
      soldOut: false,
      rsku: '17734733',
      styleId: '635968',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '840.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: "J'adore Eau de Toilette",
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '42866517',
      name: 'Miss Dior Blooming Bouquet Roller-Pearl',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608323399785406694_1_en_32.jpeg',
      tags: null,
      soldOut: false,
      rsku: '18935726',
      styleId: '759802',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '410.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Miss Dior Blooming Bouquet Roller-Pearl',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '45067311',
      name: 'Miss Dior Roller-Pearl Eau de Toilette',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608346317730897971_1_en_38.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19485127',
      styleId: '816619',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '410.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Miss Dior Roller-Pearl Eau de Toilette',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '60143318',
      name: "Miss Dior Rose N'Roses",
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611314037053227195_1_en_26.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590333670',
      styleId: '100051764',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '840.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: "Miss Dior Rose N'Roses",
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '60017997',
      name: 'Dior Addict Stellar Shine',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608355869738164368_1_en_45.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590001616',
      styleId: '100002188',
      colors: [
        {
          id: '60017997',
          hex: '#B54850',
          csku: '60017997',
          rsku: '590001616',
        },
        {
          id: '60018016',
          hex: '#E8403F',
          csku: '60018016',
          rsku: '590001626',
        },
        {
          id: '60018020',
          hex: '#BC2346',
          csku: '60018020',
          rsku: '590001635',
        },
        {
          id: '60018026',
          hex: '#A2141F',
          csku: '60018026',
          rsku: '590001638',
        },
        {
          id: '60018013',
          hex: '#E5293C',
          csku: '60018013',
          rsku: '590001623',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '330.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Dior Addict Stellar Shine',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '45071180',
      name: 'Dior Addict Lip Maximizer',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611361831449297246_1_en_36.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19485903',
      styleId: '816835',
      colors: [
        {
          id: '45071180',
          hex: '#D48884',
          csku: '45071180',
          rsku: '19485903',
        },
        {
          id: '45071123',
          hex: '#EC6141',
          csku: '45071123',
          rsku: '19485887',
        },
        {
          id: '45071115',
          hex: '#F4CFCB',
          csku: '45071115',
          rsku: '19485879',
        },
        {
          id: '45071149',
          hex: '#E51E5B',
          csku: '45071149',
          rsku: '19485895',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '325.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Dior Addict Lip Maximizer',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '60105298',
      name: 'Sauvage Parfum',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611362346845372729_1_en_35.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590380117',
      styleId: '100034702',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '895.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Sauvage Parfum',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '43980507',
      name: 'Rouge Dior Ultra Rouge',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608337384198922822_1_en_38.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19329705',
      styleId: '796191',
      colors: [
        {
          id: '43980507',
          hex: '#a03c3c',
          csku: '43980507',
          rsku: '19329705',
        },
        {
          id: '43980630',
          hex: '#c53a3f',
          csku: '43980630',
          rsku: '19329804',
        },
        {
          id: '43980572',
          hex: '#903c49',
          csku: '43980572',
          rsku: '19329770',
        },
        {
          id: '43980556',
          hex: '#d23059',
          csku: '43980556',
          rsku: '19329754',
        },
        {
          id: '45071313',
          hex: '#B71F14',
          csku: '45071313',
          rsku: '19485960',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '330.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Rouge Dior Ultra Rouge',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '44159796',
      name: "J'adore Absolu",
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608340304776683602_1_en_42.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19385079',
      styleId: '803260',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,420.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: "J'adore Absolu",
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '41281924',
      name: 'Addict Lacquer Stick',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2605753669312586126_1_en_47.jpeg',
      tags: null,
      soldOut: false,
      rsku: '18288720',
      styleId: '695958',
      colors: [
        {
          id: '41281924',
          hex: '#932518',
          csku: '41281924',
          rsku: '18288720',
        },
        {
          id: '60018001',
          hex: '#9D280E',
          csku: '60018001',
          rsku: '590001611',
        },
        {
          id: '43104991',
          hex: '#AA4842',
          csku: '43104991',
          rsku: '19386101',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '330.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Addict Lacquer Stick',
      specName: null,
      categoryNameEn: 'Lipstick',
      promotionTags: null,
    },
    {
      csku: '43026921',
      name: 'Sauvage Eau de Parfum',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608327969630610055_1_en_45.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19071331',
      styleId: '766702',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,090.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Sauvage Eau de Parfum',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '45067295',
      name: 'Miss Dior Eau de Toilette',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608346317730898039_1_en_38.jpeg',
      tags: null,
      soldOut: false,
      rsku: '19485101',
      styleId: '816617',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '840.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Miss Dior Eau de Toilette',
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '60125438',
      name: 'Jadore EDP Travel Spray',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611308195897704849_1_en_29.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590413099',
      styleId: '100043696',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '1,650.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Jadore EDP Travel Spray',
      specName: null,
      categoryNameEn: 'Fragrance Sets',
      promotionTags: null,
    },
    {
      csku: '60043867',
      name: "J'adore Eau de Parfum Roller-Pearl",
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2608371709577552034_1_en_40.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590011687',
      styleId: '100009710',
      colors: null,
      salePrice: {
        isoCode: 'HKD',
        amount: '490.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: "J'adore Eau de Parfum Roller-Pearl",
      specName: null,
      categoryNameEn: 'Fragrance Singles',
      promotionTags: null,
    },
    {
      csku: '60102970',
      name: 'Prestige Foundation',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611362106327204301_1_en_29.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590140964',
      styleId: '100034073',
      colors: [
        {
          id: '60102970',
          hex: '#E6BC92',
          csku: '60102970',
          rsku: '590140964',
        },
        {
          id: '60102994',
          hex: '#EBC59E',
          csku: '60102994',
          rsku: '590141282',
        },
        {
          id: '60102960',
          hex: '#F1D1AB',
          csku: '60102960',
          rsku: '590140988',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '1,050.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Prestige Foundation',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: null,
    },
    {
      csku: '60102989',
      name: 'Dior Forever Couture Perfect Cushion',
      brand: 'DIOR',
      pic: 'https://media-neo.dfsglobal.cn/spu/SKU_2611302148583751699_1_en_39.jpeg',
      tags: null,
      soldOut: false,
      rsku: '590141220',
      styleId: '100025547',
      colors: [
        {
          id: '60102989',
          hex: '#F0CFBE',
          csku: '60102989',
          rsku: '590141220',
        },
        {
          id: '60082016',
          hex: '#E0BDA7',
          csku: '60082016',
          rsku: '590037899',
        },
        {
          id: '60082017',
          hex: '#DBB296',
          csku: '60082017',
          rsku: '590037882',
        },
      ],
      salePrice: {
        isoCode: 'HKD',
        amount: '570.00',
        name: '',
        displayLine: false,
        display: true,
        dutyPaid: false,
      },
      linePrice: null,
      brandId: '3516329754457972736',
      brandNameEn: 'DIOR',
      nameEn: 'Dior Forever Couture Perfect Cushion',
      specName: null,
      categoryNameEn: 'Foundations',
      promotionTags: null,
    },
  ];

  activeRole: any;

  stores: any = [
    'T Galleria Beauty, Hong Kong, Causeway Bay',
    'T Galleria Beauty, Hong Kong, Tsim Sha Tsui East',
    'T Galleria Beauty, Hong Kong, Moko',
    'T Galleria Beauty, Macau, Galaxy Macau',
    'T Galleria Beauty, Macau, MGM Cotai',
  ];

  storeCountries: any = [
    'Hong Kong',
    'Hong Kong',
    'Hong Kong',
    'Macau',
    'Macau',
    'Hong Kong',
    'Hong Kong',
    'Hong Kong',
    'Macau',
    'Macau',
    'Hong Kong',
    'Hong Kong',
    'Hong Kong',
    'Macau',
    'Macau',
    'Hong Kong',
    'Hong Kong',
    'Hong Kong',
    'Macau',
    'Macau',
    'Hong Kong',
    'Hong Kong',
    'Hong Kong',
    'Macau',
    'Macau',
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.activeRole = this.rolesetService.interdataList[0].activeRole;

    console.log(this.l1CategoriesFiltered, this.l2CategoriesFiltered);

    //this.slides.push(`pro${Math.floor(Math.random() * 10 + 1)}.png`);

    let slopes: any = [];

    this.brands.forEach((w: any, j: any) => {
      let b: any;

      if (w === 'Burberry' || w === 'Estee Lauder' || w === 'Dior') {
        if (w === 'Burberry') {
          b = this.items1.filter(
            (q: any, p: any) => q.brand == 'BURBERRY BEAUTY'
          );
        } else if (w === 'Estee Lauder') {
          b = this.items1.filter((q: any, p: any) => q.brand == 'Estée Lauder');
        } else if (w === 'Dior') {
          b = this.items1.filter((q: any, p: any) => q.brand == 'DIOR');
        }

        console.log(b);

        this.stores.forEach((e: any, t: any) => {
          this.l2CategoriesFiltered.list.forEach((v: any, i: any) => {
            slopes.push({
              name:
                i === 0
                  ? 'Ultimate Glow Cushion Foundation'
                  : this.items1[i].nameEn,
              type: this.l1CategoriesFiltered.l1_name,
              item: this.l2CategoriesFiltered.l2_name,
              sub_class: v,
              brand: w,
              url: `pro (${i + 1}).jpeg`,
              img: b[i].pic,
              desc: b[i].name,
              id: b[i].styleId,
              csku: b[i].csku,
              gtin: 33489006646860 + i,
              price: b[i].salePrice.amount,
              store: this.stores[t],
              country: this.storeCountries[i],
              quantity: 1,
              isInCart: false,
              status: 'view',
              index: j + '' + t + '' + i,
            });
          });
        });
      }
    });

    if (this.attributes[this.l1CategoriesFiltered.l1_name]) {
      this.attributes[this.l1CategoriesFiltered.l1_name].forEach(
        (w: any, j: any) => {
          slopes.forEach((v: any, i: any) => {
            if (i <= 10 && i % 2 === 0) slopes[i][w] = true;
            else slopes[i][w] = false;
          });
        }
      );
    }

    // slopes.forEach((v: any, i: any) => {
    //   slopes[i].id = 1003803 + i;
    // });

    slopes.forEach((v: any, i: any) => {});

    this.slopes = slopes;

    this.slides = JSON.parse(JSON.stringify(this.slopes));

    console.log(this.slopes);

    this.cartService.cartList[0].products = this.slides;

    this.dataSource = new MatTableDataSource(
      this.cartService.cartList[0].products
    );

    if (this.inItem != '') {
      let el: any = document.getElementById('target');
      el.scrollTop = el.scrollHeight;
    }
  }

  ngOnChanges() {
    this.activeRole = this.rolesetService.interdataList[0].activeRole;

    console.log(this.l1CategoriesFiltered, this.l2CategoriesFiltered);

    //this.slides.push(`pro${Math.floor(Math.random() * 10 + 1)}.png`);

    let slopes: any = [];

    this.brands.forEach((w: any, j: any) => {
      let b: any;

      if (w === 'Burberry' || w === 'Estee Lauder' || w === 'Dior') {
        if (w === 'Burberry') {
          b = this.items1.filter(
            (q: any, p: any) => q.brand == 'BURBERRY BEAUTY'
          );
        } else if (w === 'Estee Lauder') {
          b = this.items1.filter((q: any, p: any) => q.brand == 'Estée Lauder');
        } else if (w === 'Dior') {
          b = this.items1.filter((q: any, p: any) => q.brand == 'DIOR');
        }

        console.log(b);

        this.stores.forEach((e: any, t: any) => {
          this.l2CategoriesFiltered.list.forEach((v: any, i: any) => {
            slopes.push({
              name:
                i === 0
                  ? 'Ultimate Glow Cushion Foundation'
                  : this.items1[i].nameEn,
              type: this.l1CategoriesFiltered.l1_name,
              item: this.l2CategoriesFiltered.l2_name,
              sub_class: v,
              brand: w,
              url: `pro (${i + 1}).jpeg`,
              img: b[i].pic,
              desc: b[i].name,
              id: b[i].styleId,
              csku: b[i].csku,
              gtin: 33489006646860 + i,
              price: b[i].salePrice.amount,
              store: this.stores[t],
              country: this.storeCountries[i],
              quantity: 1,
              isInCart: false,
              status: 'view',
              index: j + '' + t + '' + i,
            });
          });
        });
      }
    });

    if (this.attributes[this.l1CategoriesFiltered.l1_name]) {
      this.attributes[this.l1CategoriesFiltered.l1_name].forEach(
        (w: any, j: any) => {
          slopes.forEach((v: any, i: any) => {
            if (i <= 10 && i % 2 === 0) slopes[i][w] = true;
            else slopes[i][w] = false;
          });
        }
      );
    }

    // slopes.forEach((v: any, i: any) => {
    //   slopes[i].id = 1003803 + i;
    // });

    slopes.forEach((v: any, i: any) => {});

    this.slopes = slopes;

    this.slides = JSON.parse(JSON.stringify(this.slopes));

    console.log(this.slopes);

    this.cartService.cartList[0].products = this.slides;

    this.dataSource = new MatTableDataSource(
      this.cartService.cartList[0].products
    );
  }

  ngDoCheck() {
    // this.dataSource = new MatTableDataSource(
    //   this.cartService.cartList[0].products
    // );

    this.filterProcess();
  }

  searchBrands(e: any) {
    console.log(e.target.value);

    this.brands = this.allBrands.filter((v: any, i: any) => {
      if (e.target.value != '') {
        console.log(v);
        return v.toLowerCase().includes(e.target.value.toLowerCase());
      } else {
        console.log(v);
        return v;
      }
    });
  }

  filterProcess() {
    //console.log(this.fa.filterArray);

    this.slides = this.slopes.filter((v: any, i: any) => {
      if (
        this.fa.filterArray.brands.length > 0 &&
        this.fa.filterArray.subClass.length > 0 &&
        this.fa.filterArray.defined.length > 0 &&
        this.fa.filterArray.countries.length > 0
      ) {
        return (
          this.fa.filterArray.brands.includes(v.brand) &&
          this.fa.filterArray.subClass.includes(v.sub_class) &&
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true &&
          this.fa.filterArray.countries.includes(v.country)
        );
      } else if (
        this.fa.filterArray.brands.length > 0 &&
        this.fa.filterArray.subClass.length > 0 &&
        this.fa.filterArray.defined.length > 0
      ) {
        return (
          this.fa.filterArray.brands.includes(v.brand) &&
          this.fa.filterArray.subClass.includes(v.sub_class) &&
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true
        );
      } else if (
        this.fa.filterArray.brands.length > 0 &&
        this.fa.filterArray.subClass.length > 0 &&
        this.fa.filterArray.countries.length > 0
      ) {
        return (
          this.fa.filterArray.brands.includes(v.brand) &&
          this.fa.filterArray.subClass.includes(v.sub_class) &&
          this.fa.filterArray.countries.includes(v.country)
        );
      } else if (
        this.fa.filterArray.brands.length > 0 &&
        this.fa.filterArray.defined.length > 0 &&
        this.fa.filterArray.countries.length > 0
      ) {
        return (
          this.fa.filterArray.brands.includes(v.brand) &&
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true &&
          this.fa.filterArray.countries.includes(v.country)
        );
      } else if (
        this.fa.filterArray.subClass.length > 0 &&
        this.fa.filterArray.defined.length > 0 &&
        this.fa.filterArray.countries.length > 0
      ) {
        return (
          this.fa.filterArray.subClass.includes(v.sub_class) &&
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true &&
          this.fa.filterArray.countries.includes(v.country)
        );
      } else if (
        this.fa.filterArray.brands.length > 0 &&
        this.fa.filterArray.countries.length > 0
      ) {
        return (
          this.fa.filterArray.brands.includes(v.brand) &&
          this.fa.filterArray.countries.includes(v.country)
        );
      } else if (
        this.fa.filterArray.subClass.length > 0 &&
        this.fa.filterArray.countries.length > 0
      ) {
        return (
          this.fa.filterArray.subClass.includes(v.sub_class) &&
          this.fa.filterArray.countries.includes(v.country)
        );
      } else if (
        this.fa.filterArray.brands.length > 0 &&
        this.fa.filterArray.subClass.length > 0
      ) {
        return (
          this.fa.filterArray.brands.includes(v.brand) &&
          this.fa.filterArray.subClass.includes(v.sub_class)
        );
      } else if (
        this.fa.filterArray.brands.length > 0 &&
        this.fa.filterArray.defined.length > 0
      ) {
        return (
          this.fa.filterArray.brands.includes(v.brand) &&
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true
        );
      } else if (
        this.fa.filterArray.defined.length > 0 &&
        this.fa.filterArray.subClass.length > 0
      ) {
        return (
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true &&
          this.fa.filterArray.subClass.includes(v.sub_class)
        );
      } else if (
        this.fa.filterArray.defined.length > 0 &&
        this.fa.filterArray.countries.length > 0
      ) {
        return (
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true &&
          this.fa.filterArray.countries.includes(v.country)
        );
      } else if (this.fa.filterArray.brands.length > 0) {
        return this.fa.filterArray.brands.includes(v.brand);
      } else if (this.fa.filterArray.subClass.length > 0) {
        return this.fa.filterArray.subClass.includes(v.sub_class);
      } else if (this.fa.filterArray.defined.length > 0) {
        return (
          this.fa.filterArray.defined.includes('DFS Exclusive') &&
          v['DFS Exclusive'] === true
        );
      } else if (this.fa.filterArray.countries.length > 0) {
        return this.fa.filterArray.countries.includes(v.country);
      } else {
        return v;
      }
    });

    if (this.fa.filterArray.search !== '') {
      this.slides = this.slides.filter((v: any, i: any) => {
        return (
          v.brand
            .toLowerCase()
            .includes(this.fa.filterArray.search.toLowerCase()) ||
          v.desc
            .toLowerCase()
            .includes(this.fa.filterArray.search.toLowerCase())
        );
      });
    }

    this.dataSource = new MatTableDataSource(this.slides);
  }

  genderFilter(e: any, item: any) {
    console.log(e, item);

    const index = this.fa.filterArray.gender.indexOf(item);

    if (this.fa.filterArray.gender.includes(item) && index > -1)
      this.fa.filterArray.gender.splice(index, 1);
    else this.fa.filterArray.gender.push(item);

    console.log(this.fa.filterArray);
  }

  brandFilter(e: any, item: any) {
    console.log(e, item);

    const index = this.fa.filterArray.brands.indexOf(item);

    if (this.fa.filterArray.brands.includes(item) && index > -1)
      this.fa.filterArray.brands.splice(index, 1);
    else this.fa.filterArray.brands.push(item);

    console.log(this.fa.filterArray);

    this.filterProcess();
  }

  countryFilter(e: any, item: any, taskType: any) {
    console.log(e, item, taskType);

    if (taskType !== true) {
      const index = this.fa.filterArray.continents.indexOf(item.name);

      if (this.fa.filterArray.continents.includes(item.name) && index > -1)
        this.fa.filterArray.continents.splice(index, 1);
      else this.fa.filterArray.continents.push(item.name);

      console.log(this.fa.filterArray);

      item.subtasks.forEach((v: any, i: any) => {
        this.fa.filterArray.countries.push(item.name);
      });
    } else if (taskType === true) {
      const index = this.fa.filterArray.countries.indexOf(item.name);

      if (this.fa.filterArray.countries.includes(item.name) && index > -1)
        this.fa.filterArray.countries.splice(index, 1);
      else this.fa.filterArray.countries.push(item.name);

      console.log(this.fa.filterArray);

      this.filterProcess();
    }
  }

  updateAllComplete(i: any) {
    this.countries[i].completed = !this.countries[i].completed;

    this.countries[i].subtasks != null &&
      this.countries[i].subtasks.forEach(
        (t) => (t.completed = this.countries[i].completed)
      );

    console.log(this.countries);
  }

  someComplete(i: any, j: any) {
    this.countries[i].subtasks[j].completed =
      !this.countries[i].subtasks[j].completed;

    let checkedCount = this.countries[i].subtasks.filter(
      (v: any, i: any) => v.completed
    ).length;

    let country: any = document.getElementById(`country${i}`);

    if (
      checkedCount > 0 &&
      checkedCount === this.countries[i].subtasks.length
    ) {
      this.countries[i].completed = true;

      this.countries = this.countries;

      console.log(this.countries);

      country.checked = true;
    } else if (
      checkedCount > 0 &&
      checkedCount < this.countries[i].subtasks.length
    ) {
      country.checked = checkedCount > 0;
      country.indeterminate =
        checkedCount > 0 && checkedCount < this.countries[i].subtasks.length;
    }

    console.log(checkedCount, country);
  }

  onQuickViewHoverAllItems(e: any) {
    console.log(e);
    let tip: any = document.getElementById(`quickViewHover`);

    tip.style.opacity = 1;
    tip.style.display = 'block';
    tip.style.left = e.pageX + 9 + 'px';
    tip.style.top = e.pageY + 14 + 'px';
  }

  onQuickViewHoverOutAllItems(e: any) {
    console.log(e);
    let tip: any = document.getElementById(`quickViewHover`);

    tip.style.opacity = 0;
    tip.style.display = 'none';
  }

  onAddToCartHoverAllItems(e: any) {
    // console.log(e);
    let tip: any = document.getElementById(`addToCart`);

    tip.style.opacity = 1;
    tip.style.display = 'block';
    tip.style.left = e.pageX + 9 + 'px';
    tip.style.top = e.pageY + 14 + 'px';

    var tooltip_rect = tip.getBoundingClientRect();

    if (tooltip_rect.x + tooltip_rect.width + 10 > window.innerWidth) {
      tip.style.left = e.pageX - tooltip_rect.width + 'px';
    }
    if (tooltip_rect.y + tooltip_rect.height > window.innerHeight) {
      tip.style.top = e.pageY - tooltip_rect.height + 'px';
    }
  }

  onAddToCartHoverOutAllItems(e: any) {
    // console.log(e);
    let tip: any = document.getElementById(`addToCart`);

    tip.style.opacity = 0;
    tip.style.display = 'none';
  }

  addToCart(el: any, index: any) {
    console.log(el, index);

    el.status = 'moved to cart';

    this.cartService.cartList[0].cart.push(el);

    console.log(this.cartService);
  }

  openDialog(item) {
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(ProductmodalComponent, {
      width: '750px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal');
    });
  }
}
