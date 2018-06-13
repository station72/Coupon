import { Injectable } from "@angular/core";
import { PagingOutDto } from "../../../shared/data/paging/paging-out.dto";
import { Observable } from "rxjs";
import { ListResult } from "../../../shared/data/list-result.dto";
import { AdminDto } from "../dto/admin.dto";
import { HttpService } from "../../shared/services/http.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminsService {
  private readonly uri = "/admins";
  constructor(private http: HttpService) {}

  getAdmin(id: string): Observable<AdminDto> {
    return this.http.get<AdminDto>(this.uri + "/" + id).pipe(
      map(res => {
        return res.body;
      })
    );
  }

  getList(data: PagingOutDto): Observable<ListResult<AdminDto>> {
    return this.http.get<ListResult<AdminDto>>(this.uri, data).pipe(
      map(res => {
        return res.body;
      })
    );
  }

  update(id: string, data: any): any {
    return this.http.put<AdminDto>(this.uri + "/" + id, data).pipe(
      map(res => {
        return res.body;
      })
    );
  }

  delete(id: string): any {
    return this.http.delete(this.uri + "/"+ id).pipe(map(res=>{
      return res.body;
    }))
  }
}
