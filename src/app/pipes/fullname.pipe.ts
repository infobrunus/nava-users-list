import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.interface';

// Pipe to join Title, First Name and Last Name
@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  transform(value: User): string {
    if (value && value.title && value.firstName && value.lastName) {
      return `${value.title}. ${value.firstName} ${value.lastName}`;
    }
    return '';
  }
}
