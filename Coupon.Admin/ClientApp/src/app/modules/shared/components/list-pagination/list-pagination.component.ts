import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResult } from 'src/app/shared/data/list-result.dto';

@Component({
  selector: 'list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.css']
})
export class ListPaginationComponent implements OnInit {

  @Input()
  public fetchListDataAction: Function;

  @Input()
  public fetchOnInit = true;

  private totalPages = 1;
  private offset = 0;
  private limit = 50;
  public currentPage = 1;

  public pages: number[] = [];

  constructor() { }

  ngOnInit() {
    this.setPage(1);
  }

  public onNextPage() {
    const offset = this.currentPage * this.limit;
    this.fetchList(offset);
  }

  public onPrevPage() {
    const offset = (this.currentPage - 2) * this.limit;
    this.fetchList(offset);
  }

  public setPage(page: number) {
    const offset = (page - 1) * this.limit;
    this.fetchList(offset);
  }

  public isCurrentPage(page: number) {
    return this.currentPage === page;
  }

  private fetchList(offset: number) {
    this.fetchListInternal(offset).subscribe(this.refreshPaging.bind(this));
  }

  private fetchListInternal(offset: number): Observable<ListResult<any>>{
    return this.fetchListDataAction(offset) as Observable<ListResult<any>>;
  }

  private refreshPaging(listRes: ListResult<any>) {
    const paging = listRes.paging;

    this.totalPages = Math.ceil(paging.total / paging.limit);
    this.currentPage = paging.offset / paging.limit + 1;

    this.pages = Array.from(
      new Array(this.totalPages),
      (val, index) => index + 1
    );
  }

}