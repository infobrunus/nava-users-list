import { Component } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class UserCreateComponent {

  newUser: User = {
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    dateOfBirth: ''
  };

  constructor(public  userService: UserService) { }

  async onSubmit(): Promise<void> {
    try {
      await this.userService.createUser(this.newUser);
    } catch (error) {
      console.error('Error on saving new user:', error);
    }
  }

}
