import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

private apiUrl: string = "http://localhost:5077/api/tasks";


  constructor(private http: HttpClient) { }

  loadTask(headers: HttpHeaders) {
    return this.http.get(this.apiUrl, { headers });
  }

  loadTasks(categoryId: number | null, status: boolean | null,dueDate: string, headers: HttpHeaders) {
    let params = new HttpParams();

    // Add category filter if provided
    if (categoryId !== null) {
      params = params.set('categoryId', categoryId.toString());
    }

    // Add status filter if provided
    if (status !== null) {
      params = params.set('status', status.toString());
    }

    // Add dueDate filter if provided
    if (dueDate !== null) {
      params = params.set('dueDate', dueDate);
    }

    return this.http.get(this.apiUrl, { headers, params });
  }


  createNewTask(obj: any,headers: HttpHeaders) {
    return this.http.post(this.apiUrl, obj , {headers});
  }

  UpdateTask(obj: any,headers: HttpHeaders) {
    return this.http.put(this.apiUrl +'/'+ obj.id, obj, {headers});
  }

  DeleteTask(id: number,headers: HttpHeaders) {
    return this.http.delete(this.apiUrl +'/'+ id, {headers});
  }
}
