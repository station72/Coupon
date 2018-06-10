import { FormGroup } from "@angular/forms";
import { BadInputErrorsService } from "../services/bad-input-errors.service";
import { HttpErrorResponse } from "@angular/common/http";

export abstract class BaseComponent {
  constructor() {}

  public submitClicked = false;

  protected isFieldInvalid(form: FormGroup, field: string) {
    return (
      form.get(field).invalid && (form.get(field).touched || this.submitClicked)
    );
  }

  public displayFieldCss(field: string, form: FormGroup) {
    return {
      "is-invalid": this.isFieldInvalid(form, field),
      "is-valid": !this.isFieldInvalid(form, field)
    };
  }

  public isDisplayError(
    field: string,
    error: string,
    form: FormGroup
  ): boolean {
    const control = form.controls[field];
    if (!control.errors) {
      return false;
    }
    const isError = control.errors[error];
    return isError && (this.submitClicked || control.touched);
  }

  protected showServerErrors(
    serverError,
    form: FormGroup,
    badInput: BadInputErrorsService
  ) {
    let httpError = serverError as HttpErrorResponse;
    if (httpError.status === 400) {
      badInput.showHttpError(httpError);
      this.showBadInputControls(httpError, form);
      return;
    }
    console.error(httpError);
  }

  private showBadInputControls(
    httpError: HttpErrorResponse,
    form: FormGroup
  ): void {
    for (const fieldName of Object.keys(httpError.error)) {
      const controlName = fieldName.toLowerCase();
      if (!form.contains(controlName)) {
        continue;
      }
      const control = form.controls[controlName];
      control.setErrors({ invalid: true });
    }
  }
}
