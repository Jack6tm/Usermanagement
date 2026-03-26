import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Role } from '../../../Core/Role/Service/role';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Core/User/Service/user-service';

@Component({
  selector: 'app-dialog-content',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog-content.html',
  styleUrl: './dialog-content.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContent {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly roleSvc = inject(Role);
  readonly userSvc = inject(UserService);

  roles$ = this.roleSvc.getAll();

  public emailFormControl = new FormControl(this.data.user ? this.data.user.email : "", [Validators.required, Validators.email]);
  public nameFormControl = new FormControl(this.data.user ? this.data.user.name : "", [Validators.required]);
  public passwordFormControl = new FormControl(this.data.user ? this.data.user.password : "", [Validators.required]);
  public firstNameFormControl = new FormControl(this.data.user ? this.data.user.first_name : "", [Validators.required]);
  public companyPositionFormControl = new FormControl(this.data.user ? this.data.user.company_position : "", [Validators.required]);
  public roleFormControl = new FormControl(this.data.user ? this.data.user.role : "", [Validators.required]);

  public onUpdateItem(id: Number): void {
    this.userSvc.update(id,
      this.emailFormControl.value,
      this.passwordFormControl.value,
      this.nameFormControl.value,
      this.firstNameFormControl.value,
      this.companyPositionFormControl.value,
      this.roleFormControl.value,
    ).subscribe();
  }
  
  public onCreateItem(): void {
    this.userSvc.create(
      this.emailFormControl.value,
      this.passwordFormControl.value,
      this.nameFormControl.value,
      this.firstNameFormControl.value,
      this.companyPositionFormControl.value,
      this.roleFormControl.value,
    ).subscribe();
  }
}
