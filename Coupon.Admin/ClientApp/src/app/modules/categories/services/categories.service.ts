import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../../shared/services/http.service";
import { CategoryDto } from "../dto/category.dto";

@Injectable()
export class CategoriesService {
  readonly baseUrl = "/categories";

  constructor(private httpService: HttpService) {}

  getList(parentId?: any): Observable<CategoryDto[]> {
    return this.httpService
      .get<CategoryDto[]>(this.baseUrl, {
        parentId: parentId
      })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }
}
