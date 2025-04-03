import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowErrorDialogComponent } from '@components/modals/show-error-dialog/show-error-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  constructor(
    private currency: CurrencyPipe
  ) { }

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

  formatCurrenyIDR(value: any) {
    let val = String(value).replace(/[^0-9]/g, '');
    if (val) {
      return this.currency.transform(String(val).replace(/\D/g, '').replace(/^0+/, ''), 'Rp. ', 'symbol', '1.0-0');
    } else {
      return 0;
    }
  }
}
