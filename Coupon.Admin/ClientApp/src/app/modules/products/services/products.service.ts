import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductDto } from "../dto/product.dto";
import { HttpService } from "../../shared/services/http.service";
import { map } from "rxjs/operators";
import { ListResult } from "../../../shared/data/list-result.dto";
import { PagingOutDto } from "src/app/shared/data/paging/paging-out.dto";

@Injectable()
export class ProductsService {
  private readonly baseUrl = "/products";

  constructor(private httpService: HttpService) {}

  get(id: string | number): Observable<ProductDto> {
    return this.httpService
      .get<ProductDto>(this.baseUrl + "/" + id, {})
      .pipe(map(res => res.body));
  }

  getList(data: PagingOutDto): Observable<ListResult<ProductDto>> {
    return this.httpService
      .get<ListResult<ProductDto>>(this.baseUrl, data)
      .pipe(map(res => res.body));
  }

  create(data: any): Observable<ProductDto> {
    return this.httpService
      .post<ProductDto>(this.baseUrl, data)
      .pipe(map(res => res.body));
  }
}
