import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { ProviderFormFactoryService } from "../../services/provider-form-factory.service";
import { ProviderService } from "../../services/provider.service";
import { Subject } from "rxjs";
import { BaseFormComponent } from "src/app/shared/components/base-form.component";

@Component({
  selector: "app-provider-edit",
  templateUrl: "./provider-edit.component.html",
  styleUrls: ["./provider-edit.component.css"]
})
export class ProviderEditComponent extends BaseFormComponent {
  public provider: ProviderDto;
  public loading = false;
  public deleteConfirmTrigger: Subject<any> = new Subject();
  
  constructor(
    badInputService: BadInputErrorsService,
    formFactory: ProviderFormFactoryService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
  ) {
    super(formFactory, badInputService);
    
    this.createForm();
    actRoute.data.subscribe(data => {
      this.provider = data["provider"];
      this.fillFormControls(this.provider);
    });
  }

  getControlNames(): string[] {
    return ["title", "email"];
  }

  onDelete(){
    this.deleteConfirmTrigger.next();
  }

  onConfirmDelete(){
    this.providerService.delete(this.provider.id)
      .subscribe(res=>{
        this.router.navigate(['providers']);
      });
  }

  onSubmit() {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let serialized = JSON.stringify(this.form.getRawValue());
    this.providerService.update(this.provider.id, serialized).subscribe(
      res => {
        this.router.navigate(["providers"]);
      },
      error => {
        this.loading = false;
        super.showServerErrors(error);
      }
    );
  }
}
