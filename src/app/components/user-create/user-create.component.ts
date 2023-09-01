import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public userService: UserService, private router: Router) { }

  onSubmit(): void {
    this.userService.createUser(this.newUser)
      .subscribe({
        next: user => {
          this.userService.openSnackBar('User has been created successfully!');
          this.router.navigate(['/list']);
        },
        error: error => {
          const errorMessage = error.error.data.email || 'Error on create user';
          this.userService.openSnackBar(errorMessage);
          console.error('Error on create user:', error);
        }
      });

  }

}
