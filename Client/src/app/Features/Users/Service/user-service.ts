import { Injectable } from '@angular/core';
import { UserInterface } from '../Interface/user-interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpSvc } from '../../../Core/Auth/Service/http-svc';

@Injectable({
  providedIn: 'root',
})


export class UserService extends HttpSvc implements UserInterface {
  private _usersSubject = new BehaviorSubject<Array<any>>([]);
  public user$ = this._usersSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/users`,
      { headers: this.httpHeader() }
    ).pipe(
      tap((users: any)  => {
        console.log(users.member);
        this._usersSubject.next(users.member);
      }));
  }
}
