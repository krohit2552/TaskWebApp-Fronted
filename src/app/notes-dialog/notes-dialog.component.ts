import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss']
})
export class NotesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notes: string }
  ) {
    this.data.notes = data.notes || '';
  }

  onSave(): void {
    console.log('Saving notes:', this.data.notes);
    this.dialogRef.close(this.data.notes); // Pass back the updated notes to the parent component
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
