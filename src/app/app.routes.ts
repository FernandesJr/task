import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';

export const routes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: 'tasks', component: TasksComponent},
  {path: 'task', component: TaskComponent},
  {path: 'task/:id', component: TaskUpdateComponent}
];
