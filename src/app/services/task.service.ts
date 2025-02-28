import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api-config';
import { TaskCreateDto } from '../models/task-create-dto';
import { Task } from '../models/task';
import { TaskUpdateDto } from '../models/task-update-dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/tasks`);
  }

  public getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${API_CONFIG.baseUrl}/tasks/${id}`);
  }

  public createTask(task: TaskCreateDto): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/tasks`, task);
  }

  public updateTask(id: string, task: TaskUpdateDto): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/tasks/${id}`, task);
  }

  public deleteTask(id: string): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/tasks/${id}`);
  }
}
