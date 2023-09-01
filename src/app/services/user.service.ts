import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UsersResponse } from '../models/response.model';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dummyapi.io/data/v1';
  private appId = '64b53aa7c89880a234d2af51';
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

  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) { }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getUsersList(page: number, limit: number): Observable<UsersResponse> {
    const url = `${this.apiUrl}/user?page=${page}&limit=${limit}`;
     return this.http.get<UsersResponse>(url);
  }

  getUserById(userId: string): Observable<User> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<User>(url);
  }

  createUser(newUser: User): Observable<User> {
    const url = `${this.apiUrl}/user/create`;
    const newUserJSON = JSON.stringify(newUser);
    return this.http.post<User>(url, newUserJSON);
  }

  updateUser(updatedUser: User): Observable<void> {
    const url = `${this.apiUrl}/user/${updatedUser.id}`;
    return this.http.put<void>(url, updatedUser);
  }

  deleteUser(userId: string): Observable<void> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.delete<void>(url);
  }

}
