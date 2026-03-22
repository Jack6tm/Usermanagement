import { Component } from '@angular/core';
import { AuthService } from '../../../Core/Auth/Service/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private authSvc: AuthService,
    private router: Router) {
  }

  isLoggedIn() {
    return this.authSvc.isLoggedIn$;
  }

  getUser() {
    return this.authSvc.user$;
  }

  onLogout() {
    this.authSvc.logout().subscribe(() => {
      this.authSvc.removeAuthToken();
      this.router.navigate(['/login']);
    });
  }
}
