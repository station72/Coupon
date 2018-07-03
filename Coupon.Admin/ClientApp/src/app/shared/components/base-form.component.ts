import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { BadInputErrorsService } from "../services/bad-input-errors.service";
import { isUndefined } from "util";
import { IFormFactory } from "src/app/modules/shared/iform-factory.intarface";

export abstract class BaseFormComponent {
  public form: FormGroup;
  public submitClicked = false;
  constructor(
    private formFactory: IFormFactory,
    private badInput: BadInputErrorsService
  ) {
  }

  abstract getControlNames(): string[];

  protected isFieldInvalid(field: string) {
    const control = this.form.get(field);
    if(!control){
      throw new Error('Wrong control');
    }
    
    return (
      control.invalid && (control.touched || this.submitClicked)
    );
  }

  public displayFieldCss(field: string) {
    return {
      "is-invalid": this.isFieldInvalid(field),
      "is-valid": !this.isFieldInvalid(field)
    };
  }

  //to base class
  protected createForm() {
    const formInputs = {};
    for (const fieldName of this.getControlNames()) {
      formInputs[fieldName] = this.formFactory.getControl(fieldName);
    }
    this.form = new FormGroup(formInputs);
  }

  //to base class
  protected fillFormControls(entity: any) {
    if (!entity) {
      throw new Error("Entity is empty");
    }
    for (const fieldName of this.getControlNames()) {
      const value = entity[fieldName];
      const control = this.form.controls[fieldName];
      control.setValue(value);
    }
  }

  public isDisplayError(
    field: string,
    error: string,
  ): boolean {
    if(isUndefined(field)){
      throw new Error('field is undefined');
    }
    if(isUndefined(error)){
      throw new Error('error is undefined');
    }
    const control = this.form.controls[field];
    if (!control.errors) {
      return false;
    }
    const isError = control.errors[error];
    return isError && (this.submitClicked || control.touched);
  }

  protected showServerErrors(
    serverError
  ) {
    let httpError = serverError as HttpErrorResponse;
    if (httpError.status === 400) {
      this.badInput.showHttpError(httpError);
      this.showBadInputControls(httpError);
      return;
    }
    console.error(httpError);
  }

  private showBadInputControls(
    httpError: HttpErrorResponse
  ): void {
    for (const fieldName of Object.keys(httpError.error)) {
      if (fieldName === "") {
        continue;
      }
      const controlName = fieldName[0].toLowerCase() + fieldName.substring(1);
      if (!this.form.contains(controlName)) {
        continue;
      }
      const control = this.form.controls[controlName];
      control.setErrors({ invalid: true });
    }
  }
}
