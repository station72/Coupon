import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';
import { ListResult } from 'src/app/shared/data/list-result.dto';
import { PagingOutDto } from '../../../../shared/data/paging/paging-out.dto';
import { BaseListComponent } from 'src/app/shared/components/base-list.component';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'provider-list',
  templateUrl: 'provider-list.component.html'
})
export class ProviderListComponent{
  public providers: ProviderDto[] = [];
  private limit = 50;

  constructor(
    private providerService: ProviderService,
    private router: Router
  ) {
  }

  public fetchListDataCallback(offset: number){
    return this.fetchListData.bind(this);
  }

  private fetchListData(offset: number): Observable<ListResult<ProviderDto>> {
    return this.providerService
      .getList({
        limit: this.limit,
        offset: offset
      }).pipe(pipe(map(res => {
        this.providers = res.result;
        return res;
      })));
  }

  private onEdit(id: string) {
    this.router.navigate(['/providers/edit/' + id]);
  }
}
