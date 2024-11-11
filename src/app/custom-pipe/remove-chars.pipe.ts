import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeChars',
  standalone: true
})
export class RemoveCharsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/\[\+\d+ chars\]/g, '');
  }

}
