import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumAsString'
})
export class EnumAsStringPipe implements PipeTransform {

  transform(value: number, enumType: any): any {
    if(!value)
      return value;

    // return enumType[value].split(/(?=[A-Z])/).join().replace(",", " ");
    return enumType[value];
}

}
