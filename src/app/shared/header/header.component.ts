import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/modules/auth/resources/auth.service';
import { User } from 'src/app/modules/auth/resources/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userobserver = {
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.error(err),
    };

    this.authService.user.subscribe(userobserver);
  }
}
