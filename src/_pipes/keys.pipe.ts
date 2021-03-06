import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args: string[]): any {
    const keys = [];
    if (typeof value === 'object') {
      // tslint:disable-next-line:forin
      for (const key in value) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}
