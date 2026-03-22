import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsideMenu } from '../../../../Shared/AsideMenu/Component/aside-menu/aside-menu';
import { UserService } from '../../Service/user-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [AsideMenu, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users$!: Observable<any>;

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userSvc.getAll().subscribe();
    this.users$ = this.userSvc.user$;
  }
}
