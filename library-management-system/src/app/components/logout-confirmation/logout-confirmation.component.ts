import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmation',
  template: `
    <h2 mat-dialog-title>Logout Confirmation</h2>
    <mat-dialog-content>Are you sure you want to log out?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" color="warn" class="ms-5 mb-2">OK</button>
      <button mat-button mat-dialog-close color="primary" class="ms-2 mb-2">Cancel</button>
    </mat-dialog-actions>
  `,
})
export class LogoutConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmationComponent>) {}
}
