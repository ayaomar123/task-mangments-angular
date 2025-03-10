import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

apiUrl: string = " http://localhost:5077/api/tasks";


  constructor(private http: HttpClient) { }

  loadTask(headers: HttpHeaders) {
    return this.http.get(this.apiUrl, { headers });
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
