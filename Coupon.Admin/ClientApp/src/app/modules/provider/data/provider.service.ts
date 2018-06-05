import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class ProviderService implements OnInit {
    private baseUrl = "http://localhost:4200/api"
    private serviceBaseUrl = "/providers";
    constructor(private http: HttpClient) {
        
    }

    // getList() : Observable<ProviderDto[]> {
    //     this.http
    //         .get(this.baseUrl + this.serviceBaseUrl)
    //         .subscribe((res: any)=>{
    //             // if(!res.ok){
    //             //     //throw exception
    //             // }
    //             // res as ProviderDto[];
    //         });
    // }

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.http
            .get(this.baseUrl + this.serviceBaseUrl, {

            })
            .subscribe(
                this.Subscribe,
                this.Error
            );
    }

    Subscribe(response: HttpResponseBase){
        console.log();
    }

    Error(error: HttpErrorResponse){
        console.log(error);
    }
}