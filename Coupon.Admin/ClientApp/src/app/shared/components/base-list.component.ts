import { ListResult } from "../data/list-result.dto";
import { Observable } from "rxjs";

export abstract class BaseListComponent {
  // public totalPages = 1;
  // public offset = 0;
  // public limit = 50;
  // public currentPage = 1;

  // public pages: number[] = [];

  constructor() {}

  // public onNextPage() {
  //   const offset = this.currentPage * this.limit;
  //   this.fetchList(offset);
  // }

  // public onPrevPage() {
  //   const offset = (this.currentPage - 2) * this.limit;
  //   this.fetchList(offset);
  // }

  // public setPage(page: number) {
  //   const offset = (page - 1) * this.limit;
  //   this.fetchList(offset);
  // }

  // public isCurrentPage(page: number) {
  //   return this.currentPage === page;
  // }

  // private fetchList(offset: number) {
  //   this.fetchListData(offset).subscribe(this.refreshPaging.bind(this));
  // }

  // abstract fetchListData(offset: number): Observable<ListResult<any>>;

  // private refreshPaging(listRes: ListResult<any>) {
  //   const paging = listRes.paging;

  //   this.totalPages = Math.ceil(paging.total / paging.limit);
  //   this.currentPage = paging.offset / paging.limit + 1;

  //   this.pages = Array.from(
  //     new Array(this.totalPages),
  //     (val, index) => index + 1
  //   );
  // }
}
