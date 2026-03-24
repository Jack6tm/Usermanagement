import { Observable } from "rxjs";

export interface UserInterface {
  getAll: ()=>Observable<any>;
  delete: (id: Number)=>Observable<any>;
}
