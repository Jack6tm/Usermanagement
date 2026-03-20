import { Observable } from "rxjs";

export interface AuthInterface {
  login: (email: string, password: string) => Observable<any>;
  logout: () => Observable<any>;
  isAuth: () => Boolean;
  getAuthToken: () => String | null;
}
