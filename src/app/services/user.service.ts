import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dummyapi.io/data/v1';
  private appId = '64b53aa7c89880a234d2af51';
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 10;
  
  createFormControlWithValidation(validators: any[] = []): FormControl {
    return new FormControl('', [...validators, Validators.required]);
  }

  titleFormControl = this.createFormControlWithValidation();
  genderFormControl = this.createFormControlWithValidation();
  birthdateFormControl = this.createFormControlWithValidation();
  titleOptions: string[] = ['mr', 'ms', 'mrs', 'miss', 'dr'];
  genderOptions: string[] = ['male', 'female', 'other'];

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  async getUsersList(page: number, limit: number): Promise<User[]> {
    try {
      const response = await fetch(`${this.apiUrl}/user?page=${page}&limit=${limit}`, {
        headers: {
          'app-id': this.appId
        }
      });

      if (response.ok) {
        const users = await response.json();
        this.totalItems = users.total;
        return users.data;
      } else {
        throw new Error('Failed to fetch users from the API.');
      }
    } catch (error) {
      throw new Error('Error while fetching users from the API.');
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/user/${userId}`, {
        headers: {
          'app-id': this.appId
        }
      });

      if (response.ok) {
        const currentUser = await response.json();
        return currentUser;
      } else {
        throw new Error('Failed to fetch users from the API.');
      }
    } catch (error) {
      throw new Error('Error while fetching users from the API.');
    }
  }

  async createUser(newUser: User): Promise<void> {
    const url = `${this.apiUrl}/user/create`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'app-id': this.appId
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        await Swal.fire({
          title: 'User Created!',
          text: 'The user has been created successfully.',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false
        })
        await this.router.navigate(['/list']);
      } else {
        throw new Error('Failed to create a new user.');
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error on creating User',
        text: 'Please try again',
        icon: 'error',
        timerProgressBar: true,
        showConfirmButton: true,
        allowOutsideClick: false
      })
    }
  }

  async updateUser(updatedUser: User): Promise<void> {
    const url = `${this.apiUrl}/user/${updatedUser.id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'app-id': this.appId
        },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) {
        throw new Error('Failed to update the user.');
      } else {
        this.openSnackBar('User data updated successfully!');
      }
    } catch (error) {
      throw new Error('Error while updating the user.');
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'app-id': this.appId
        }
      });

      if (response.ok) {
        await Swal.fire({
          title: 'User Deleted!',
          text: 'The user has been deleted successfully.',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false
        })
      } else {
        throw new Error('Failed to delete the user from the API.');
      }
    } catch (error) {
      throw new Error('Error while deleting the user from the API.');
    }
  }


}
