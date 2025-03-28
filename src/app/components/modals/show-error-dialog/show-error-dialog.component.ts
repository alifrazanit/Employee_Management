import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Label } from '@config/label';
@Component({
  selector: 'app-show-error-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule
  ],
  templateUrl: './show-error-dialog.component.html',
  styleUrl: './show-error-dialog.component.css'
})
export class ShowErrorDialogComponent {
  label = Label;
  constructor(
    private dialogRef: MatDialogRef<ShowErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() {
    this.dialogRef.close();
  }
}
