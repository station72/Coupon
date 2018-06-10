import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BadInputErrorsService } from "src/app/shared/services/bad-input-errors.service";
import { BaseComponent } from "src/app/shared/components/base.component";

export abstract class ProviderBaseComponent extends BaseComponent {

  protected getFormControl(controlName: string): FormControl {
    switch (controlName) {
      case "title":
        return new FormControl(
          { value: "", disabled: false },
          Validators.required
        );
      case "email":
        return new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.email
        ]);
      default:
        throw new Error("Could not resolve control");
    }
  }
}
