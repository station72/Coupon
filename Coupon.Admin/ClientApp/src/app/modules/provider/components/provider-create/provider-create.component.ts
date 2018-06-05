import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Observable, fromEvent} from "rxjs";
import { ProviderService } from "../../data/provider.service";

@Component({
  selector: "providers-create",
  templateUrl: "provider-create.component.html",
  providers: [ProviderService]
})
export class ProviderCreateComponent implements OnInit, AfterViewInit {
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;

  public title: FormControl;
  public email: FormControl;

  @ViewChild("submitBtn")
  public submitBtn: ElementRef

  constructor(
    private providerService: ProviderService 
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

  ngAfterViewInit(): void {
    // var stream = fromEvent(this.submitBtn.nativeElement, "click");
    // stream.subscribe(function(){
    //   console.log('click');
    // });
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

    console.log("send to the server!");
    var serialized = JSON.stringify(this.createForm.getRawValue());

    // this.http
    //   .post("api/providers/create", serialized)
    //   .subscribe(result => {
    //       console.log(result);
    // });
  }
}
