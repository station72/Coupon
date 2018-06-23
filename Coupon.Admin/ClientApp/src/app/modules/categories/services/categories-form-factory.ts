import { Injectable } from "@angular/core";
import { IFormFactory } from "src/app/modules/shared/iform-factory.intarface";
import { FormControl, Validators } from "@angular/forms";

@Injectable()
export class CategoriesFormFactory implements IFormFactory {
  getControl(controlName: string): FormControl {
    switch (controlName) {
      case "title":
        return new FormControl("", [
          Validators.required,
          Validators.maxLength(64)
        ]);
      case "friendlyUrl":
        return new FormControl("", [Validators.maxLength(128)]);
      default:
        throw new Error("Could not resolve control '" + controlName + "'");
      
    }
  }
}
