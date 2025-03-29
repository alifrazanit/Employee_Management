import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  @Input() configPagination: configPaginationi = {
    pageIndex: 0,
    dataLength: 0,
    pageSize: 0,
  };

  @Output() onDataReady = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTable'] && changes['dataTable'].currentValue) {
      this.setUpPagination()
    }
  }

  setUpPagination(){
    const startIndex = (this.configPagination.pageIndex - 1) * this.configPagination.pageSize;
    const endIndex = startIndex + this.configPagination.pageSize;
    const hasil = this.dataTable.slice(startIndex, endIndex);
    this.onDataReady.emit(hasil)
  }

}
