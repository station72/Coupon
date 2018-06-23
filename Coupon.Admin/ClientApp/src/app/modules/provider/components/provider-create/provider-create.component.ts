import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { ProviderFormFactoryService } from "../../services/provider-form-factory.service";
import { ProviderService } from "../../services/provider.service";
import { BaseFormComponent } from "src/app/shared/components/base-form.component";

@Component({
  selector: "providers-create",
  templateUrl: "provider-create.component.html",
  providers: [ProviderService]
})
export class ProviderCreateComponent extends BaseFormComponent implements OnInit {
  public submitClicked = false;
  public loading = false;

  public title: FormControl;
  public email: FormControl;

  constructor(
    formFactory: ProviderFormFactoryService,
    private badInputService: BadInputErrorsService,
    private providerService: ProviderService,
    private route: Router,
  ) {
    super(formFactory, badInputService);
  }

  getControlNames(): string[] {
    return ["email", "title"];
  }

  ngOnInit(): void {
    this.createForm();
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
        super.showServerErrors(error);
      }
    );
  }
}
