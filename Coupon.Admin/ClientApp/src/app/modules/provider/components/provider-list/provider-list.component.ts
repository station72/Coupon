import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "provider-list",
  templateUrl: "provider-list.component.html"
})
export class ProviderListComponent {
  public result: ProviderDto[];

  constructor(private http: HttpClient) {
    // this.http.get("api/providers").subscribe(result => {
    //   this.result = result as ProviderDto[];
    // });
  }
}
