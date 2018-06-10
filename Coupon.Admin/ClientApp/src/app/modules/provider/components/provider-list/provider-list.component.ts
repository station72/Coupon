import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../../services/provider.service";
import { Router } from "@angular/router";
import { ListResult } from "src/app/shared/data/list-result.dto";
import { PagingOutDto } from "../../../../shared/data/paging/paging-out.dto";

@Component({
  selector: "provider-list",
  templateUrl: "provider-list.component.html"
})
export class ProviderListComponent implements OnInit {
  public total? = 0;
  public offset = 0;
  public count = 50;
  public currentPage = 1;

  public providers: ProviderDto[] = [];
  public result: ProviderDto[];

  constructor(
    private providerService: ProviderService,
    private router: Router
  ) {
  }

  ngOnInit(){
    this.providerService.getList({
       count: this.count,
       offset: 0
    }).subscribe(res=>{
      this.refreshPaging(res);
    });
  }

  refreshPaging(listRes: ListResult<ProviderDto>){
    this.providers = listRes.result;
    this.total = listRes.paging.total;
    this.currentPage = listRes.paging.total / this.count;
  }

  getNextPage() : PagingOutDto{
    return {
      count: this.count,
      offset: this.offset
    }
  }

  onEdit(id: string){
    this.router.navigate(['/providers/edit/' + id]);
  }
}
