import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { TaskService } from '../../services/task.service';
import { TaskCreateDto } from '../../models/task-create-dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AppMaterialModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  task: TaskCreateDto = { title: '', description: ''};
  taskForm: UntypedFormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.max(100)]],
    description: ['', [Validators.required, Validators.max(250)]],
    status: [false, []]
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: TaskService,
    private router: Router,
    private toastr: ToastrService) {
  }

  public joinTaskWithForm(): void {
    this.task.title = this.taskForm.get('title')?.value;
    this.task.description = this.taskForm.get('description')?.value;
  }

  public create(): void {
    this.joinTaskWithForm();
    console.log(this.task);
    this.service.createTask(this.task).subscribe({
      next: res => {
        this.toastr.success('Tarefa criada com sucesso');
        this.router.navigate(['/tasks']);
      },
      error: error => {
        console.log(error);
        this.toastr.error("Ops.. tivemos algum erro");
      }
    });
  }

  back(): void {
    history.back();
  }
}
