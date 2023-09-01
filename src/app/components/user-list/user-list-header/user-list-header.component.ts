import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-list-header',
  templateUrl: './user-list-header.component.html',
  styleUrls: ['./user-list-header.component.scss']
})
export class UserListHeaderComponent {
  @Input() toggleValue: boolean = false;
  @Output() toggleValueChange = new EventEmitter<boolean>();

  onToggleValueChanged() {
    this.toggleValueChange.emit(this.toggleValue);
  }
}
