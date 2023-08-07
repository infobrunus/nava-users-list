import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: User = {
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  isLoaded: Boolean = false;
  private destroy$ = new Subject<void>();
  private updateUserSubject = new Subject<User>();

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  selectFormControl = new FormControl('', Validators.required);
  titleOptions: string[] = ["mr", "ms", "mrs", "miss", "dr"];

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
          this.isLoaded = true;
        });
    });

    this.updateUserSubject
    .pipe(debounceTime(500), takeUntil(this.destroy$))
    .subscribe((updatedUser) => this.updateUser());

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUserChange(updatedUser: User): void {
    this.updateUserSubject.next(this.user);
  }

  async updateUser(): Promise<void> {
    await this.userService.updateUser(this.user);
  }

}
