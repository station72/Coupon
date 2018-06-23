import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../../shared/services/http.service";
import { CategoryDto } from "../dto/category.dto";

@Injectable()
export class CategoriesService {
  readonly baseUrl = "/categories";

  constructor(private httpService: HttpService) {}

  get(id: string | number): Observable<CategoryDto> {
    return this.httpService
      .get<CategoryDto>(this.baseUrl + "/" + id)
      .pipe(map(res => res.body));
  }

  getList(parentId = ""): Observable<CategoryDto[]> {
    return this.httpService
      .get<CategoryDto[]>(this.baseUrl, {
        parentId: parentId
      })
      .pipe(map(res => res.body));
  }

  moveTo(id: string | number, to: string | number): Observable<any> {
    return this.httpService
      .put<any>(this.baseUrl + "/" + id + "/move", { parentId: to })
      .pipe(map(res => res.body));
  }

  create(data: any): Observable<CategoryDto> {
    return this.httpService
      .post<CategoryDto>(this.baseUrl, data)
      .pipe(map(res => res.body));
  }

  update(id: string | number, data: any): Observable<CategoryDto> {
    return this.httpService
      .put<CategoryDto>(this.baseUrl + "/" + id, data)
      .pipe(map(res => res.body));
  }

  delete(id: string | number): Observable<any> {
    return this.httpService
      .delete(this.baseUrl + "/" + id)
      .pipe(map(res => res.body));
  }
}
