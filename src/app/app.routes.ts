import { AuthComponent } from './components/auth/auth.component';
import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: 'tasks', component: TasksComponent, canActivate: [authGuard]},
  {path: 'task', component: TaskComponent, canActivate: [authGuard]},
  {path: 'task/:id', component: TaskUpdateComponent, canActivate: [authGuard]},
  {path: 'auth', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
];
