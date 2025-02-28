import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../models/task';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { TaskUpdateDto } from '../../models/task-update-dto';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AppMaterialModule, CommonModule],
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.scss'
})
export class TaskUpdateComponent {

  idParam: string = '';
  taskAlreadyCompleted = false;
  task: Task = { title: '', description: ''};
  taskForm: UntypedFormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.max(100)]],
    description: ['', [Validators.required, Validators.max(250)]],
    status: [false, []]
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getId();
    this.getTask();
  }

  public getId(): void {
    this.route.params.subscribe(params => this.idParam = params['id']);
  }

  public getTask(): void {
    this.service.getTaskById(this.idParam).subscribe({
      next: res => {
        console.log(res);
        this.task = res;
      },
      error: error => console.log(error),
      complete: () => {
        this.checkTaskFinish();
        this.joinFormWithTask();
      }
    });
  }

  public checkTaskFinish(): void {
    if (this.task.finishDateTime) {
      this.task.status = true;
      this.taskForm.get('status')?.disable();
      this.taskAlreadyCompleted = true;
    }
  }

  public joinTaskWithForm(): void {
    this.task.title = this.taskForm.get('title')?.value;
    this.task.description = this.taskForm.get('description')?.value;
    this.task.status = this.taskForm.get('status')?.value;
  }

  public joinFormWithTask(): void {
    this.taskForm.get('title')!.setValue(this.task.title);
    this.taskForm.get('description')!.setValue(this.task.description);
    this.taskForm.get('status')!.setValue(this.task.status);
  }

  public enableTaskAgain(): void {
    this.task.status = false;
    this.task.finishDateTime = null;
    //Atualizar e Redirecionar para a lista de tarefas
    this.callService();
  }

  private createTaskDto(): TaskUpdateDto {
    var taskUpdate: TaskUpdateDto = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      finishDateTime: this.task.finishDateTime
    }
    return taskUpdate;
  }

  private callService(): void {
    this.service.updateTask(this.idParam, this.createTaskDto()).subscribe({
      next: res => {
        console.log(res);
        this.toastr.info('Tarefa atualizada!');
        this.router.navigate(['tasks']);
      },
      error: error => {
        console.log(error);
        this.toastr.error('Ops.. tivemos algum erro');
      }
    });
  }

  public update(): void {
    this.joinTaskWithForm();
    if(this.task.status && !this.taskAlreadyCompleted) this.task.finishDateTime = new Date(moment().format());
    this.callService();
  }

  public delete(): void {
    this.service.deleteTask(this.idParam).subscribe({
      next: res => {
        this.toastr.error('Tarefa deletada');
        this.router.navigate(['tasks']);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  back(): void {
    history.back();
  }
}
