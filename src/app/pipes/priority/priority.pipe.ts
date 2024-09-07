import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority',
})
export class PriorityPipe implements PipeTransform {
  transform(value: number): string {
    let priority = '';
    switch (value) {
      case 0:
        priority = 'Low';
        break;
      case 1:
        priority = 'Medium';
        break;
      case 2:
        priority = 'High';
        break;
      case 3:
        priority = 'Urgent';
        break;
      default:
        priority = 'Unknow priority';
        break;
    }

    return priority;
  }
}
