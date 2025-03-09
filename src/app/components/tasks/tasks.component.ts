import { AuthService } from './../../services/auth.service';
import { TaskService } from './../../services/task.service';
import { Component, inject } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  authService: AuthService = inject(AuthService);

  tasks: Task[] = [];
  tasksSelected: Task[] = [];

  constructor(private service: TaskService, private router: Router) {
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
    this.tasks.forEach(t => {
      if (t.finishDateTime == null) t.status = false;
      else t.status = true;
    });
  }

  public newTaskNavigate(): void {
    this.router.navigate(['/task']);
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

  public editTask(id: string) {
    this.router.navigate([`task/${id}`]);
  }

  public logout(): void {
    this.authService.logout();
  }
}
