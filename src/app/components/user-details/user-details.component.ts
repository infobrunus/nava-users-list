import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  isLoaded: Boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  getUser(userId: string) {
    this.userService.getUserById(userId)
      .subscribe({
        next: user => {
          this.user = user;
          this.isLoaded = true;
        },
        error: error => {
          console.error('User not found:', error);
          this.isLoaded = true;
        }
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.getUser(userId);
    });
  }

}
