import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.interface';

// Converts string date to brazilian format
@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: User): string {
    if (!value) return '';

    const date = new Date(value.dateOfBirth);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
