import { TaskService } from './../../services/task.service';
import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  tasks: Task[] = [];
  tasksSelected: Task[] = [];

  constructor(private service: TaskService) {
    this.service.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.checkTaskStatus();
        this.selectedAllTasks();
      },
      error: (error) => console.log(error)
    });
  }

  private checkTaskStatus() {
    // API return 0001 in fullYear how default when date is null;
    this.tasks.forEach(t => {
      if (new Date(t.finishDateTime).getFullYear() == 1) t.status = false;
      else t.status = true;
    });
  }

  public selectedAllTasks(): void {
    this.tasksSelected = this.tasks;
  }

  public selectedTasksCompleted(): void {
    this.tasksSelected = this.tasks.filter(t => t.status);
  }

  public selectedTasksNoCompleted(): void {
    this.tasksSelected = this.tasks.filter(t => !t.status);
  }
}
