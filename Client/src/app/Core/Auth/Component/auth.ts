import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  public loginForm: FormGroup;
  public error = '';
  public loading = false;

  constructor(private authSvc: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef) {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  onSubmitLogin() {
    if (this.loginForm.invalid || this.loading) {
      return;
    }
    this.loading = true;
    this.error = "";
    const { email, password } = this.loginForm.value;
    this.authSvc.login(email, password)
      .pipe(finalize(() => this.loading = false)
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.status == 401 ? 'Erreur de crédential' : '';
          this.cd.markForCheck();
        }
      });
  }
}
