import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api-config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/tasks`);
  }
}
