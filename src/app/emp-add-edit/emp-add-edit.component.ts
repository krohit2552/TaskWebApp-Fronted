import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  currentTime: string;
  showContactNumber: boolean = false;
  taskStatus: boolean = true; // Default task status is open

  taskTypes: string[] = [
    'Call',
    'Meeting',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: TaskService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    const now = new Date();
    this.currentTime = now.toTimeString().slice(0, 5); // Format HH:MM

    this.empForm = this._fb.group({
      entityname: '',
      date: '',
      time: this.currentTime, // Initialize the time field with the current time
      taskType: '',
      contactNumber: '', // Ensure this matches the model
      contactperson: '',
      notes: '',
      status: this.taskStatus // Initialize status
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
      this.taskStatus = this.data.status; // Set initial task status
    }
  }

  // Function to set task status (open/close)
  setTaskStatus(status: boolean): void {
    this.taskStatus = status;
    this.empForm.patchValue({ status: status });
  }

  // Function called when task type changes
  onTaskTypeChange(event: any): void {
    this.showContactNumber = event.value === 'Call';
  }

  // Function called on form submission
  onFormSubmit(): void {
    if (this.empForm.valid) {
      const formData = { ...this.empForm.value, status: this.taskStatus };
      if (this.data) {
        this._empService.updateTask(this.data.id, formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addTask(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
