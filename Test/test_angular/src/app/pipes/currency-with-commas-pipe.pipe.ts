import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyWithCommasPipe',
  standalone: true
})
export class CurrencyWithCommasPipePipe implements PipeTransform {

  transform(value: number): string {
    let valueStr: string = value.toString();

    let [integerPart, decimalPart] = valueStr.split('.');

    let integerWithCommas: string = "";
    for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
      if (count > 0 && count % 3 === 0) {
        integerWithCommas = ',' + integerWithCommas;
      }
      integerWithCommas = integerPart[i] + integerWithCommas;
    }

    let formattedValue: string = integerWithCommas;

    return formattedValue;
  }
}
