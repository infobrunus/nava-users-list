import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  titleOptions: string[] = ["mr", "ms", "mrs", "miss", "dr"];

  newUser: User = {
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  selectFormControl = new FormControl('', Validators.required);

  async onSubmit(): Promise<void> {
    try {
      await this.userService.createUser(this.newUser);
    } catch (error) {
      console.error('Error on saving new user:', error);
    }
  }

}
