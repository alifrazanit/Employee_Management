import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowErrorDialogComponent } from '@components/modals/show-error-dialog/show-error-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  constructor() { }

  showError(msg: any) {
    return this.dialog.open(ShowErrorDialogComponent, {
      width: '250px',
      data: { message: msg }
    })
  }

  showInfo(text: string, acton: any, className: string) {
    this._snackBar.open(text, acton, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: className ? className : 'edit-snackbar'
    });
  }
}
