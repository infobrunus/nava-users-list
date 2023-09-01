import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.interface';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { SweetAlertResult } from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.scss']
})
export class UserListTableComponent {
  @Input() toggleValue: boolean = false;
  @Input() searchValue: string = '';

  usersList: User[] = [];
  isLoaded: Boolean = false;
  tableLoading: Boolean = false;
  currentPage = 0;
  itemsPerPage = 10;
  totalItems = 0;

  handlePageEvent(e: PageEvent) {
    this.tableLoading = true;
    this.itemsPerPage = e.pageSize;
    this.currentPage = e.pageIndex;
    this.getItems();
  }

  constructor(private userService: UserService, private router: Router) {
    this.getItems();
  }

  ngOnChanges(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemsPerPage = this.searchValue ? this.totalItems : 10;

    this.userService.getUsersList(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: users => {

          if (this.searchValue) {
            this.usersList = users.data.filter(user => 
              user.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
              user.lastName.toLowerCase().includes(this.searchValue.toLowerCase())
            )
          } else {
            this.usersList = users.data;
          }

          this.totalItems = users.total;
          this.isLoaded = true;
          this.tableLoading = false;
        },
        error: error => {
          console.error('Error fetching users:', error);
          this.isLoaded = true;
          this.tableLoading = false;
        }
      });
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
        this.userService.deleteUser(userId).subscribe({
          next: users => {
            this.getItems();
            this.userService.openSnackBar('User deleted successfully!');
          },
          error: error => {
            this.userService.openSnackBar('Error on delete user!');
            console.error('Error on delete user:', error);
          }
        });
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
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

}
