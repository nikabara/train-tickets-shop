import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceToVagonClass',
  standalone: true
})
export class PriceToVagonClassPipe implements PipeTransform {

  transform(value: number): string | null {
    if (!value) return null;

    switch (value) {
      case 125:
        return 'Business'
      
        case 75:
          return 'I'

          case 35:
            return 'II'

      default:
        return null
    }
  }

}
