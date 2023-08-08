import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


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

  constructor(private route: ActivatedRoute, public  userService: UserService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserById(userId)
        .then(user => {
          this.user = user;
          this.isLoaded = true;
        })
        .catch(error => {
          console.error('User not found:', error);
        });
    });

    this.updateUserSubject
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((updatedUser) => {
        if (!this.isFormInitializing) {
          this.updateUser(updatedUser);
        } else {
          this.isFormInitializing = false; 
        }
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    let newDateFormattedISO = (event.value!).toISOString();
    this.user.dateOfBirth = newDateFormattedISO;
    this.updateUser(this.user);
  }

  onUserChange(updatedUser: User): void {
    //Using debounce to prevent too many requests to server
    this.updateUserSubject.next(this.user);
  }

  async updateUser(updatedUser: User): Promise<void> {
    debugger
    await this.userService.updateUser(updatedUser);
  }

}
