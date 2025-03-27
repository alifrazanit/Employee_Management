import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowErrorDialogComponent } from '@components/modals/show-error-dialog/show-error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private dialog = inject(MatDialog); // Correct way to inject MatDialog
  constructor() { }

  showError(msg: any) {
    return this.dialog.open(ShowErrorDialogComponent, {
      width: '250px',
      data: { message: msg }
    })
  }
}
