import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Core/Auth/Service/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authSvc: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  public user = this.authSvc.currentUser;
  public isLoggedIn$ = this.authSvc.isLoggedIn$;


  onLogout() {
    this.authSvc.logout().subscribe(() => {
      this.authSvc.removeAuthToken();
      this.router.navigate(['/login']);
    });
  }
}
