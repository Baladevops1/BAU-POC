import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoriestype',
  templateUrl: './categoriestype.component.html',
  styleUrls: ['./categoriestype.component.css'],
})
export class CategoriestypeComponent implements OnInit {
  constructor(public router: Router, private route: ActivatedRoute) {}

  @Input() type: any;
  @Input() item: any;
  @Input() inItem: any;
  @Input() l1CategoriesFiltered: any;
  @Input() l2CategoriesFiltered: any;
  @Input() filterArray: any;

  attributes: any = {
    Beauty: [
      'DFS Exclusive',
      'Unisex',
      'Women',
      'Limited Edition',
      'Anti Aging',
      'Prestige Skincare',
    ],
    SWT: [
      'Seasonal',
      'World First',
      'Filter Cigarette',
      'International Premium',
    ],
    Fashion: [
      'High Value',
      'Premium',
      'Smooth Leather',
      'Designer',
      'Fashion Classics',
    ],
  };

  carouselHeaders: string[] = [
    'Bestsellers',
    'Top-Rated Products',
    'New In Makeup',
  ];
  slides: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ];

  ngOnInit(): void {
    console.log(this.type == '');
    console.log(this.item == '');
  }

  head = () => {
    let heads = this.item || this.type;
    return heads.toUpperCase();
  };
}
