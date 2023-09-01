import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list-section',
  templateUrl: './user-list-section.component.html',
  styleUrls: ['./user-list-section.component.scss']
})
export class UserListSectionComponent {
  //@Output() searchValueChanged = new EventEmitter<string>();

  toggleValue: boolean = false;
  searchValue: string = '';

  onSearchValueChange(value: string) {
    this.searchValue = value;
  }

  /*onSearchInputChange(searchValue: string): void {
    this.searchValueChanged.emit(searchValue);
  }*/
}
