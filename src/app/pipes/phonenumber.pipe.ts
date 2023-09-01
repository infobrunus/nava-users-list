import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.interface';

// Pipe to join Title, First Name and Last Name
@Pipe({ name: 'phoneNumber' })
export class PhoneNumberPipe implements PipeTransform {
    transform(phoneNumber: string): string {
        if (!phoneNumber) return '';
        
        const cleaned = phoneNumber.replace(/\D/g, '');

        if (cleaned.length === 10) {
            // If the length is 10, format the string as (00) 0000-0000
            const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
            if (!match) {
                return phoneNumber;
            }
            const areaCode = match[1];
            const firstGroup = match[2];
            const secondGroup = match[3];
            return `(${areaCode}) ${firstGroup}-${secondGroup}`;
        } else if (cleaned.length === 11) {
            // If the length is 11, format the string as (00) 00000-0000
            const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
            if (!match) {
                return phoneNumber;
            }
            const areaCode = match[1];
            const firstGroup = match[2];
            const secondGroup = match[3];
            return `(${areaCode}) ${firstGroup}-${secondGroup}`;
        } else {
            // If the length is not 10 or 11, return the original input string
            return phoneNumber;
        }
    }
}
