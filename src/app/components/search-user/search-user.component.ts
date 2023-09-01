import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  searchValue: string = '';
  @Output() searchValueChange = new EventEmitter<string>();
  private searchValueSubject = new Subject<string>();

  constructor() {
    this.searchValueSubject
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.searchValueChange.emit(value);
      });
  }

  onSearchInputChange() {
    this.searchValueSubject.next(this.searchValue);
  }
}
