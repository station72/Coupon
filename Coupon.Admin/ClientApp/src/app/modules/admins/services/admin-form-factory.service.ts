import { Injectable } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Injectable()
export class AdminFormFactoryService implements IFormFactory{
    getControl(controlName: string): FormControl{
        switch (controlName) {
            case 'login':
                return new FormControl('',[Validators.required]);                
            case 'name':
                return new FormControl('');
            case 'email':
                return new FormControl('', [Validators.required, Validators.email]);
            case 'role':
                return new FormControl('', [Validators.required]);
            default:
                throw new Error("Could not resolve formControl " + controlName);
        }
    }
}

export interface IFormFactory{
    getControl(controlName: string) : FormControl;
}