import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { LoadingService } from '@services/loading/loading.service';


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
  loadingService = inject(LoadingService);
  
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
    this.loadingService.setLoading(true);
    if(this.dataTable.length != 0){
      const startIndex = this.configPagination.pageIndex * this.configPagination.pageSize;
      const endIndex = startIndex + this.configPagination.pageSize;
      this.configPagination.dataLength = this.dataTable.length;
      const hasil = this.dataTable.slice(startIndex, endIndex);
      this.onDataReady.emit(hasil)
    } else {
      this.onDataReady.emit([])
    }
  
    this.loadingService.setLoading(false);
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
