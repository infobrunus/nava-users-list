import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class UserEditComponent implements OnInit, OnDestroy {

  user: User = {
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    dateOfBirth: ''
  };

  isLoaded: Boolean = false;
  isFormInitializing: Boolean = true;
  private destroy$ = new Subject<void>();
  private updateUserSubject = new Subject<User>();
  userForm: FormGroup;

  constructor(private route: ActivatedRoute, public userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      title: [this.user.title, Validators.required],
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(3)]],
      phone: [this.user.phone, [Validators.required, Validators.minLength(3)]],
      gender: [this.user.gender, [Validators.required]],
      dateOfBirth: [this.user.dateOfBirth, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserById(userId)
        .subscribe({
          next: user => {
            this.user = user;
            this.userForm.patchValue({
              id: user.id,
              title: user.title,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              gender: user.gender,
              phone: user.phone,
              dateOfBirth: user.dateOfBirth
            });

            this.isLoaded = true;
          },
          error: error => {
            console.error('User not found:', error);
            this.isLoaded = true;
          }
        });
    });

    this.userForm.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.isFormInitializing) {
          const updatedUser: User = {
            id: this.user.id,
            title: this.userForm.get('title')!.value,
            firstName: this.userForm.get('firstName')!.value,
            lastName: this.userForm.get('lastName')!.value,
            email: this.user.email,
            gender: this.userForm.get('gender')!.value,
            phone: this.userForm.get('phone')!.value,
            dateOfBirth: this.userForm.get('dateOfBirth')!.value
          };

          if (this.userForm.valid) {
            this.updateUserSubject.next(updatedUser);
          }
        } else {
          this.isFormInitializing = false;
        }
      });

    this.updateUserSubject
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((updatedUser: User) => {
        this.updateUser(updatedUser);
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateUser(updatedUser: User): void {

    this.userService.updateUser(updatedUser)
      .subscribe({
        next: success => {
          this.userService.openSnackBar('User data updated successfully!');
        },
        error: error => {
          console.error('Failed to update the user:', error);
          this.isLoaded = true;
        }
      });
  }

}
