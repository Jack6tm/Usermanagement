import { Injectable } from '@angular/core';
import { UserInterface } from '../Interface/user-interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpSvc } from '../../Auth/Service/http-svc';

@Injectable({
  providedIn: 'root',
})


export class UserService extends HttpSvc implements UserInterface {
  private _usersSubject = new BehaviorSubject<Array<any>>([]);
  private _usersCountSubject = new BehaviorSubject<Number>(0);
  private static API_PATH = "/users";
  public user$ = this._usersSubject.asObservable();
  public usersCount$ = this._usersCountSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  public getAll(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${UserService.API_PATH}`,
      { headers: this.httpHeader() }
    ).pipe(
      tap((users: any)  => {
        this._usersSubject.next(users.data);
        this._usersCountSubject.next(users.data.length);
      }));
  }

  public delete(id:Number) {
    return this.http.delete(
      `${this.apiUrl}${UserService.API_PATH}/${id}`,
      { headers: this.httpHeader() }
    ).pipe(
      tap((users: any)  => {
        this._usersSubject.next(users.data);
        this._usersCountSubject.next(users.data.length);
      }));
  }
}
