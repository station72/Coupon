import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../../modules/shared/services/http.service";
import { ImageDto } from "../data/image/image.dto";

@Injectable()
export class ContentService {
  private readonly baseUrl = "/content";
  
  constructor(private httpService: HttpService) {}

  uploadImage(data: FormData): Observable<ImageDto> {
    return this.httpService
      .postFormData<ImageDto>(this.baseUrl + "/images/upload", data)
      .pipe(map(res => res.body));
  }
}
