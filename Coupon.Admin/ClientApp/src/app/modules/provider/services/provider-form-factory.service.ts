import { FormControl, Validators } from "@angular/forms";
import { IFormFactory } from "src/app/modules/shared/iform-factory.intarface";

export class ProviderFormFactoryService implements IFormFactory {
  getControl(controlName: string): FormControl {
    switch (controlName) {
      case "title":
        return new FormControl("", [
          Validators.required,
          Validators.maxLength(255)
        ]);
      case "email":
        return new FormControl("", [
          Validators.required,
          Validators.email
        ]);
      case "login":
        return new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(128)
        ]);
      case "password":
        return new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255)
        ]);

      default:
        throw new Error("Could not resolve control '" + controlName + "'");
    }
  }
}
