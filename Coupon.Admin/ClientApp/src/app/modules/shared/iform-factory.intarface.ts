import { FormControl } from "@angular/forms";

export interface IFormFactory{
    getControl(controlName: string) : FormControl;
}