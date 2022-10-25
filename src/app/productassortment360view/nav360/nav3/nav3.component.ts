import { Component, OnInit, Input } from '@angular/core';
import { FilterArrayService } from 'src/app/filterArray.service';

@Component({
  selector: 'app-nav3',
  templateUrl: './nav3.component.html',
  styleUrls: ['./nav3.component.css'],
})
export class Nav3Component implements OnInit {
  constructor(private fa: FilterArrayService) {}

  @Input() type: any;
  @Input() item: any;
  @Input() l1CategoriesFiltered: any;
  @Input() setItems: any;

  open: any;
  inputOpenText: any;

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
      'DFS Exclusive',
      'Seasonal',
      'World First',
      'Filter Cigarette',
      'International Premium',
    ],
    Fashion: [
      'DFS Exclusive',
      'High Value',
      'Premium',
      'Smooth Leather',
      'Designer',
      'Fashion Classics',
    ],
  };

  overHide = (e: any) => {
    e.target.parentElement.parentElement.parentElement.parentElement.style.opacity = 0;
    console.log(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  };

  subClassFilter(e: any, item: any) {
    console.log(e, item, this.fa.filterArray);

    let index: any;

    if (this.fa.filterArray.subClass && this.fa.filterArray.subClass.length) {
      index = this.fa.filterArray.subClass.indexOf(item);

      if (this.fa.filterArray.subClass.includes(item) && index > -1)
        this.fa.filterArray.subClass.splice(index, 1);
      else this.fa.filterArray.subClass.push(item);
    } else {
      this.fa.filterArray.subClass.push(item);
    }

    console.log(this.fa.filterArray.subClass);
  }

  definedFilter(e: any, item: any) {
    console.log(e, item, this.fa.filterArray);

    let index: any;

    if (this.fa.filterArray.defined && this.fa.filterArray.defined.length) {
      index = this.fa.filterArray.defined.indexOf(item);

      if (this.fa.filterArray.defined.includes(item) && index > -1)
        this.fa.filterArray.defined.splice(index, 1);
      else this.fa.filterArray.defined.push(item);
    } else {
      this.fa.filterArray.defined.push(item);
    }

    console.log(this.fa.filterArray.defined);
  }

  toggleActive = (e: any, i: any, l3: any) => {
    console.log(e);

    $(`.normal-tabs-${i}`).toggleClass('active');

    this.subClassFilter(e, l3);
  };

  toggleDefinedActive = (e: any, i: any, l3_item: any) => {
    console.log(e);

    $(`.defined-tabs-${i}`).toggleClass('active');

    this.definedFilter(e, l3_item);
  };

  ngOnInit(): void {}

  onQuickViewHoverAllItems(e: any) {
    let tip: any = document.getElementById(`customFilter`);

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

  onQuickViewHoverOutAllItems(e: any) {
    let tip: any = document.getElementById(`customFilter`);

    tip.style.opacity = 0;
    tip.style.display = 'none';
  }

  openText() {
    this.open = true;

    document.getElementById('openText')?.focus();
  }

  addL3(e: any, i: any) {
    console.log(this.inputOpenText, e, e.target.value);

    if (e.key === 'Enter') {
      this.l1CategoriesFiltered.l2_categories[i].list[6] = this.inputOpenText;

      this.open = false;
    }
  }

  over = (e: any) => {
    console.log(e.target.nextSibling);

    e.target.nextSibling.style.opacity = 1;

    var tooltip = (<HTMLElement>(
      (<HTMLElement>e.target).parentNode
    )).querySelector('.nav-pane') as HTMLElement;

    let index = Number(tooltip.getAttribute('data-index'));

    var ktooltip_rect = (<HTMLElement>e.target).getBoundingClientRect();

    if (index > 5) {
      tooltip!.style.right = 0 + 'px';
    } else if (index == 5) {
      var tipX = ktooltip_rect.width + 5;
      tooltip!.style.left = tipX + 'px';
    } else {
      tooltip!.style.left = 0 + 'px';
    }
  };
}
