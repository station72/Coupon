import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';
import { ListResult } from 'src/app/shared/data/list-result.dto';
import { PagingOutDto } from '../../../../shared/data/paging/paging-out.dto';

@Component({
  selector: 'provider-list',
  templateUrl: 'provider-list.component.html'
})
export class ProviderListComponent implements OnInit {
  public totalPages = 1;
  public offset = 0;
  public limit = 50;
  public currentPage = 1;

  public pages: number[] = [];

  public providers: ProviderDto[] = [];
  public result: ProviderDto[];

  constructor(
    private providerService: ProviderService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.fetchList(0);
  }

  private refreshPaging(listRes: ListResult<ProviderDto>) {
    const paging = listRes.paging;
    this.providers = listRes.result;

    this.totalPages = Math.ceil(paging.total / paging.limit);
    this.currentPage = paging.offset / paging.limit + 1;

    this.pages = Array.from(
      new Array(this.totalPages),
      (val, index) => index + 1
    );
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

  private fetchList(offset: number) {
    this.providerService
      .getList({
        limit: this.limit,
        offset: offset
      })
      .subscribe(this.refreshPaging.bind(this));
  }

  public isCurrentPage(page: number) {
    return this.currentPage === page;
  }

  private onEdit(id: string) {
    this.router.navigate(['/providers/edit/' + id]);
  }
}
