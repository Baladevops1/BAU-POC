import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productmap',
  templateUrl: './productmap.component.html',
  styleUrls: ['./productmap.component.css'],
})
export class ProductmapComponent implements OnInit {
  countries1: any = ['Europe', 'Middle East', 'Oceania'];

  countries2: any = ['North America', 'Asia & Pacific Islands'];

  constructor(private route: ActivatedRoute) {}

  img: any;
  gtin: any;
  id: any;
  brand: any;
  desc: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.img = params['img'];
      this.gtin = params['gtin'];
      this.id = params['id'];
      this.brand = params['brand'];
      this.desc = params['desc'];
    });
  }

  onQuickViewHoverAllItems(e: any, id: any) {
    console.log(e);
    let tip: any = document.getElementById(`${id}`);

    console.log(id, tip);

    tip.style.opacity = 1;
    tip.style.display = 'block';
    tip.style.left = e.pageX + 9 + 'px';
    tip.style.top = e.pageY + 14 + 'px';
  }

  onQuickViewHoverOutAllItems(e: any, id: any) {
    console.log(e);
    let tip: any = document.getElementById(id);

    tip.style.opacity = 0;
    tip.style.display = 'none';
  }
}
