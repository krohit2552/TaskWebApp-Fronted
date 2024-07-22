import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    
    'entityname',
    'date',
    'time',
    'taskType',
    'contactperson',
    'notes',
    'status',
    'action'
  ];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  openAddEditTaskForm() {
    const dialogRef = this.dialog.open(EmpAddEditComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getTasks();
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.dataSource = new MatTableDataSource(tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  createFilter(): (data: Task, filter: string) => boolean {
    return (data: Task, filter: string): boolean => {
      const transformedFilter = filter.trim().toLowerCase();
      return Object.values(data).some(value => {
        if (typeof value === 'string' && value.toLowerCase().includes(transformedFilter)) {
          return true;
        } else if (value === true && 'open'.includes(transformedFilter)) {
          return true;
        } else if (value === false && 'closed'.includes(transformedFilter)) {
          return true;
        }
        return false;
      });
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.coreService.openSnackBar('Task deleted!', 'done');
        this.getTasks(); // Refresh tasks after deletion
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  openEditForm(data: Task) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      data: { ...data }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTasks();
    });
  }

  duplicateTask(task: Task) {
    if (!task.id) {
      console.error('Task ID is undefined');
      return;
    }

    this.taskService.duplicateTask(task.id).subscribe({
      next: () => {
        this.coreService.openSnackBar('Task duplicated!', 'done');
        this.getTasks();
      },
      error: (error) => {
        console.error('Error duplicating task:', error);
      }
    });
  }


  changeStatus(row: Task): void {
    row.status = !row.status; // Toggle status
    this.updateTask(row); // Update status in the database
  }

  updateTask(task: Task) {
    if (!task.id) {
      console.error('Task ID is undefined');
      return;
    }
    this.taskService.updateTask(task.id, task).subscribe({
      next: (updatedTask) => {
        this.coreService.openSnackBar('Task updated!', 'done');
        const index = this.dataSource.data.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedTask;
          this.dataSource.data = [...this.dataSource.data];
        }
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  viewFullNotes(task: Task): void {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      data: { notes: task.notes || '' }
    });
  
    dialogRef.afterClosed().subscribe((newNotes: string) => {
      if (newNotes !== undefined) {
        task.notes = newNotes;
        this.updateTask(task); // Update task in the database
      }
    });
  }
  

  addNotes(task: Task): void {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      data: { notes: task.notes || '' }
    });

    dialogRef.afterClosed().subscribe((newNotes: string) => {
      console.log('Dialog closed with new notes:', newNotes);
      if (newNotes !== undefined) {
        task.notes = newNotes;
        this.updateTask(task); // Update task in the database
      }
    });
  }
}
