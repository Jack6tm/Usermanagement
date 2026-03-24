import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsideMenu } from '../../../../Shared/AsideMenu/Component/aside-menu/aside-menu';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService } from '../../../../Core/User/Service/user-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { OpenDialog } from '../../../../Shared/Dialog/open-dialog/open-dialog';

@Component({
  selector: 'app-users',
  imports: [AsideMenu, CommonModule, OpenDialog, FontAwesomeModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users$!: Observable<any>;
  faPen = faPen;
  faDelete = faRecycle;

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userSvc.getAll().subscribe();
    this.users$ = this.userSvc.user$;
  }

  onDeleteUser(id: Number) {
    this.userSvc.delete(id).subscribe();
  }
}
