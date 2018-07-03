import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFormFactory } from 'src/app/modules/shared/iform-factory.intarface';

@Injectable()
export class ProductsFormFactoryService implements IFormFactory {
  getControl(controlName: string) : FormControl{
    switch (controlName) {
      case "title":
        return new FormControl("", [Validators.required, Validators.maxLength(255)]);
      case "fullTitle":
        return new FormControl("", [Validators.required, Validators.maxLength(512)]);
      case "validFrom":
        return new FormControl("", [Validators.required]);
      case "validUntil":
        return new FormControl("", [Validators.required]);
      case "conditions":
        return new FormControl("", [Validators.required, Validators.maxLength(1024 * 8)]);
      case "description":
        return new FormControl("", [Validators.required, Validators.maxLength(1024 * 8)]);
      case "oldPrice":
        return new FormControl("", [Validators.required]);
      case "newPrice":
        return new FormControl("", [Validators.required]);
       case "startAvailableCount":
        return new FormControl("", [Validators.required, Validators.min(1)]);
      case "onSale":
        return new FormControl("", [Validators.required]);
      case "mainImageId":
        return new FormControl("", [Validators.required])
      default:
        throw new Error("Could not resolve control '" + controlName + "'");
    }
  }
}
