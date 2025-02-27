import { TaskService } from './../../services/task.service';
import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  panelOpenState = false;

  tasks: Task[] = [];

  constructor(private service: TaskService) {
    this.service.getTasks().subscribe({
      next: (res) => {
        console.log(res);
        this.tasks = res;
      },
      error: (error) => console.log(error)
    });
  }
}
