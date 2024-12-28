import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitSeatNumber',
  standalone: true
})
export class SplitSeatNumberPipe implements PipeTransform {

  transform(value: string, part: 'number' | 'letter'): string | null {
    if (!value) return null;

    const match = value.match(/^(\d+)([A-Za-z]+)$/);

    if (match) {
      return part === 'number' ? match[1] : match[2];
    }

    return null;
  }

}
