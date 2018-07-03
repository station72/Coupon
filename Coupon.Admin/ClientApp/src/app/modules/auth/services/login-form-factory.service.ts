import { Injectable } from "@angular/core";
import { IFormFactory } from "../../shared/iform-factory.intarface";
import { FormControl, Validators } from "@angular/forms";

@Injectable()
export class LoginFormFactoryService implements IFormFactory {
  constructor() {}

  getControl(controlName: string): FormControl {
    switch (controlName) {
      case "username":
        return new FormControl("", [Validators.required]);
      case "password":
        return new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]);
      default:
        throw new Error(`Could not resolve control '${controlName}'`);
    }
  }
}
