import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { ProviderService } from "../../services/provider.service";

@Component({
  selector: "providers-create",
  templateUrl: "provider-create.component.html",
  providers: [ProviderService]
})
export class ProviderCreateComponent implements OnInit {
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;

  public title: FormControl;
  public email: FormControl;

  @ViewChild("submitBtn")
  public submitBtn: ElementRef

  constructor(
    private providerService: ProviderService,
    private route: Router,
    private badInput: BadInputErrorsService
  ) {}

  ngOnInit(): void {
    this.providerService.getList();

    this.title = new FormControl({value: '', disabled: false}, Validators.required);
    this.email = new FormControl({value: '', disabled: false}, [Validators.required, Validators.email]);

    this.createForm = new FormGroup({
      title: this.title,
      email: this.email
    });
  }

  get f() : FormGroup {
    return this.createForm;
  }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      console.log(this.createForm);
      return;
    }

    this.loading = true;

    var serialized = JSON.stringify(this.createForm.getRawValue());
    this.providerService.create(serialized).subscribe(
      (provider)=>{
        this.route.navigate(['providers']);
      }, 
      (error)=>{
        this.loading = false;        
        let httpError = error as HttpErrorResponse;
        if(httpError.status === 400){
          this.badInput.showHttpError(httpError);
          return;
        }
        console.error(httpError);
      }
    );
  }
}
