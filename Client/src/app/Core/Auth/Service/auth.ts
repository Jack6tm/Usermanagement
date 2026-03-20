import { Injectable } from '@angular/core';
import { AuthInterface } from '../Interface/auth';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpSvc } from '../../../Shared/Services/http-svc';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpSvc implements AuthInterface {
  private _userSubject = new BehaviorSubject<any>(null);
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!this.getAuthToken());

  user$ = this._userSubject.asObservable();
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap((res: any) => {
        localStorage.setItem(this.tokenKey, res.token);
        this._isLoggedIn$.next(true);
        this.getMe().subscribe();
      })
    );
  }

  logout() {
    this._userSubject.next(null);
    this._isLoggedIn$.next(false);
    return this.http.post(
      `${this.apiUrl}/logout`,
      {}
    );
  }

  getMe() {
    return this.http.get(`${this.apiUrl}/me`, { headers: this.httpHeader() }).pipe(
      tap(user => {
        this._userSubject.next(user);
      })
    );
  }

  isAuth() {
    const token = this.getAuthToken();
    if (!token) {
      return false;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
