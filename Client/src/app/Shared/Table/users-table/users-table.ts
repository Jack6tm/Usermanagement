import { Component, inject, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../../Core/User/Service/user-service';
import { MatButtonModule } from '@angular/material/button';
import { UserElement } from '../../../Core/User/Interface/user-element';
import { OpenDialog } from '../../Dialog/open-dialog/open-dialog';
import { AuthService } from '../../../Core/Auth/Service/auth';
import { Router } from '@angular/router';
import { CanAction } from '../../../Core/Auth/Service/can-action';


@Component({
  selector: 'app-users-table',
  imports: [MatTableModule, MatButtonModule, OpenDialog],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable implements OnInit {

  private userSvc = inject(UserService);
  private authSvc = inject(AuthService);
  private canActionSvc = inject(CanAction);
  private router = inject(Router);

  public displayedColumns: string[] = ['id', 'name', 'first_name', 'company_position', 'email', "role", "actions"];
  public dataSource: UserElement[] = [];

  @Input() user!: UserElement[];

  ngOnInit(): void {
    this.dataSource = this.user.map((element: UserElement) => ({
      id: element.id,
      name: element.name,
      first_name: element.first_name,
      email: element.email,
      company_position: element.company_position,
      role: element.role ?? null
    }));
  }

  public onDeleteItem(id: Number): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      if (this.authSvc.currentUser()?.id == id) {
        if (window.confirm("Il s’agit de vous-même. Cette action est irréversible. Voulez-vous continuer ?")) {
          this.userSvc.delete(id).subscribe(() => {
            this.authSvc.removeAuthToken();
            this.router.navigate(['/login']);
          });
        }
        return;
      } else {
        this.userSvc.delete(id).subscribe();
      }
      return;
    }
  }

  public canDelete = (user: UserElement) => {
    return this.canActionSvc.canDeleteUser(user);
  };
}
