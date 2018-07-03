import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'booleanAsString'
  })
export class BooleanAsStringPipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        if(value === true){
            return 'Да';
        }
        else if(value === false){
            return 'Нет';
        }
        else{
            return value;
        }
    }

}