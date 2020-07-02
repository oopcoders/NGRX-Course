import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-pagination-buttons-widget',
  templateUrl: './pagination-buttons-widget.component.html',
  styleUrls: ['./pagination-buttons-widget.component.scss'],
})
export class PaginationButtonsWidgetComponent implements OnInit {
  @Input() pagination: Pagination;
  @Output() selecedUrl: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  paginationChangeEmit(url: string) {
    this.selecedUrl.emit(url);
  }
}
