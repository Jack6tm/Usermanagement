import { UserElement } from "../../User/Interface/user-element";

export interface CanAction {
  canDeleteUser: (targetUser: UserElement)=>boolean;
  canCreateUser: ()=>boolean;
  canEditUser: (targetUser: UserElement)=>boolean;
}
