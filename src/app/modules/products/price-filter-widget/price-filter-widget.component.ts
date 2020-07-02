import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PriceFilter } from '../resources/product';

@Component({
  selector: 'app-price-filter-widget',
  templateUrl: './price-filter-widget.component.html',
  styleUrls: ['./price-filter-widget.component.scss'],
})
export class PriceFilterWidgetComponent implements OnInit {
  constructor() {}

  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;

  @Output() selectedRadioEvent = new EventEmitter();

  PriceOptions: PriceFilter[] = [
    {
      name: '$100.00 to $250.00',
      value: 'pricerange_1',
      min: '0',
      max: '250',
    },
    {
      name: '$250.00 to $500.00',
      value: 'pricerange_2',
      min: '250',
      max: '500',
    },
    {
      name: '$500.00 to $750.00',
      value: 'pricerange_5',
      min: '500',
      max: '750',
    },
    {
      name: '$750.00 to $999.99',
      value: 'pricerange_4',
      min: '750',
      max: '999',
    },
  ];

  getSelecteditem() {
    this.radioSel = this.PriceOptions.find(
      (Item) => Item.value === this.radioSelected
    );
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  onItemChange(item) {
    this.selectedRadioEvent.emit(item);
    this.getSelecteditem();
  }

  ngOnInit(): void {
    this.radioSelected = 'pricerange_1';
    this.getSelecteditem();
  }
}
