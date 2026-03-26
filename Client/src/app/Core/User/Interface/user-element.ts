export interface ApiResponse<T> {
  data: T;
}

export interface UserElement {
    id: number;
    name: String;
    first_name: String;
    company_position: String;
    email: String;
    role: Array<UserRoleElement>;
}

export interface UserRoleElement {
  id: number,
  name: string
}
