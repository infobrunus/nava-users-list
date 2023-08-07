import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  usersList: User[] = [];
  isLoaded: Boolean = false;
  currentPage = 0;
  itemsPerPage = 10;
  totalItems = this.userService.totalItems;

  constructor(private userService: UserService, private router: Router) {
    this.getItems();
  }

  async getItems(): Promise<void> {
    this.usersList = await this.userService.getUsersList(this.currentPage, this.itemsPerPage);
    this.isLoaded = true;
  }

  async deleteUser(userId: string): Promise<void> {
    if (userId) {
      const result: SweetAlertResult = await Swal.fire({
        title: 'Are you sure you want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545'
      });

      if (result.isConfirmed) {
        await this.userService.deleteUser(userId);
        this.getItems();
      }
    }
  }

  //Pagination

  async previousPage(): Promise<void> {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.getItems();
    }
  }

  async nextPage(): Promise<void> {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      await this.getItems();
    }
  }

  totalPages(): number {
    return Math.ceil(this.userService.totalItems / this.itemsPerPage);
  }

}
