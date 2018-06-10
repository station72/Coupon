import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { ProviderService } from "../../services/provider.service";
import { ProviderBaseComponent } from "../provider-base/provider-base.component";

@Component({
  selector: "providers-create",
  templateUrl: "provider-create.component.html",
  providers: [ProviderService]
})
export class ProviderCreateComponent extends ProviderBaseComponent
  implements OnInit {
  public form: FormGroup;
  public submitClicked = false;
  public loading = false;

  public title: FormControl;
  public email: FormControl;

  constructor(
    private providerService: ProviderService,
    private route: Router,
    private badInputService: BadInputErrorsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.title = super.getFormControl("title");
    this.email = super.getFormControl("email");

    this.form = new FormGroup({
      title: this.title,
      email: this.email
    });
  }

  onSubmit() {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    var serialized = JSON.stringify(this.form.getRawValue());

    this.providerService.create(serialized).subscribe(
      provider => {
        this.route.navigate(["providers"]);
      },
      error => {
        this.loading = false;
        super.showServerErrors(error, this.form, this.badInputService);
      }
    );
  }
}
