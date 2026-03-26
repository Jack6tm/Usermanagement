import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContent } from '../dialog-content/dialog-content';
import { UserElement } from '../../../Core/User/Interface/user-element';
import { CanAction } from '../../../Core/Auth/Service/can-action';
import { AuthService } from '../../../Core/Auth/Service/auth';

@Component({
  selector: 'app-open-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './open-dialog.html',
  styleUrl: './open-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenDialog {
  @Input() name!: string;
  @Input() user!: UserElement;

  private dialog = inject(MatDialog);
  private canActionSvc: CanAction = inject(CanAction);
  private authSvc = inject(AuthService);


  openDialog() {
    const dialogRef = this.dialog.open(DialogContent, {
      data: { name: this.name, user: this.user },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public canEdit = () => {
    return this.canActionSvc.canEditUser(this.user);
  };

  public canCreate = () => {
    return this.canActionSvc.canCreateUser();
  };
}
