import { inject, Injectable } from '@angular/core';
import { CanAction as CanActionInterface } from '../Interface/can-action';
import { AuthService } from './auth';
import { UserElement, UserRoleElement } from '../../User/Interface/user-element';
import { Roles } from '../../User/enums/roles';
@Injectable({
  providedIn: 'root',
})
export class CanAction implements CanActionInterface {
  private _authSvc: AuthService = inject(AuthService);

  public canDeleteUser(targetUser: UserElement) {
    const user = this.currentUser();

    if (!user) {
      return false;
    }
    const roles = user.role.map(r => r.name);
    return (roles.includes(Roles.ADMIN) ||
      user.id === targetUser.id
    );
  }

  public canCreateUser() {
    const user = this.currentUser();
    if (!user) {
      return false;
    }
    const roles = user.role.map(r => r.name);
    return roles.includes(Roles.ADMIN);
  }

  public canEditUser(targetUser: UserElement) {
    const user = this.currentUser();
    if (!user) {
      return false;
    }
    if(!targetUser) {
      return false;
    }
    const currentUserRoles = user.role.map(r => r.name);
    const targetUserRoles = targetUser.role.map(r => r.name);
    return (currentUserRoles.includes(Roles.ADMIN) ||
    (currentUserRoles.includes(Roles.MODERATOR) && !targetUserRoles.includes(Roles.ADMIN)) ||
      user.id === targetUser.id
    );
  }

  private get currentUser() {
    return this._authSvc.currentUser;
  }
}
