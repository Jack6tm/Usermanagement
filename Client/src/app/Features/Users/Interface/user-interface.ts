import { Observable } from "rxjs";

export interface UserInterface {
  getAll: ()=>Observable<any>;
}
