import { Routes } from '@angular/router';
import { Dashboard } from './Features/Dashboard/Component/dashboard';
import { authGuard } from './Core/Auth/Guard/Auth/auth-guard';
import { Auth } from './Core/Auth/Component/auth';
import { loggedGuard } from './Core/Auth/Guard/LoggedAuth/logged-guard';
import { Users } from './Features/Users/Component/users/users';
export const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'dashboard/users', component: Users, canActivate: [authGuard] },
  { path: 'login', component: Auth, canActivate: [loggedGuard]},
];
