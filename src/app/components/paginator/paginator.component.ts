import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';


export interface configPaginationi {
  pageIndex: number; // currentPage
  dataLength: number; // totalData
  pageSize: number;
}

@Component({
  selector: 'app-paginator',
  imports: [
    MatPaginatorModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnChanges {
  @Input() dataTable: any[] = [];
  configPagination = {
    pageIndex: 0, // currentPage
    dataLength: 0, // totalData
    pageSize: 10, // perPage
  };


  @Output() onDataReady = new EventEmitter();
  @Output() onPageEvent = new EventEmitter();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTable'] && changes['dataTable'].currentValue) {
      this.setUpPagination()
    }
  }

  setUpPagination() {
    const startIndex = this.configPagination.pageIndex * this.configPagination.pageSize;
    const endIndex = startIndex + this.configPagination.pageSize;
    this.configPagination.dataLength = this.dataTable.length;
    const hasil = this.dataTable.slice(startIndex, endIndex);
    this.onDataReady.emit(hasil)
  }

  handlePageEvent(event: any) {
    this.configPagination = {
      dataLength: event.length,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };
    this.setUpPagination();
  }

}
