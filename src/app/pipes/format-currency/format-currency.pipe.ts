import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {
  constructor(
    private curencyPipe: CurrencyPipe
  ) { }
  
  transform(value: number) {
    return this.curencyPipe.transform(value, 'Rp. ', 'symbol', '1.0-0');
  }

}
