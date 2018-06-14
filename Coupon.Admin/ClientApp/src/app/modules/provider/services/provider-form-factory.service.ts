import { FormControl, Validators } from "@angular/forms";
import { IFormFactory } from "../../admins/services/admin-form-factory.service";

export class ProviderFormFactoryService implements IFormFactory {
  getControl(controlName: string): FormControl {
    switch (controlName) {
      case "title":
        return new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.maxLength(255)
        ]);
      case "email":
        return new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.email
        ]);
      default:
        throw new Error("Could not resolve control '" + controlName + "'");
    }
  }
}
