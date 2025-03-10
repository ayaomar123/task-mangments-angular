import { TaskService } from './../../services/task.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryServiceService } from './../../services/category-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StatusPipe } from '../../pipes/status.pipe';
import { PirorityPipe } from '../../pipes/pirority.pipe';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule,DatePipe,StatusPipe,PirorityPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasksList: any[] = [];
  categoriesList: any[] = [];

  http = inject(HttpClient);

  constructor(private taskService: TaskService) {
    this.getCategories();
    this.getTasks()
  }

  getCategories() {
    this.http.get("http://localhost:5077/api/categories").subscribe((result: any) => {
      this.categoriesList = result;
    });
  }
  

  taskobj: any = {
    "id": 0,
    "title": "",
    "description": "",
    "status": false,
    "priority": 1,
    "dueDate": null,
    "categoryId": 1
  }

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('AngularUserToken')}`, // Example: JWT token
    'Content-Type': 'application/json'
  });

  getTasks() {
     
    this.taskService.loadTask(this.headers).subscribe(
      (result: any) => {
        this.tasksList = result;
      },
      (error) => {
        console.error("Error fetching tasks:", error);
        alert("Failed to load tasks. Please try again.");
      }
    );
  
    this.onReset();
  }

  onReset() {
    this.taskobj = {}
  }

  onSave() {
    this.taskService.createNewTask(this.taskobj,this.headers).subscribe((res: any) => {
      //alert("Task created successfully");
      this.getTasks();
    })
  }
  
  onEdit(task: any) {
    this.taskobj = { ...task }; // Copy task data into taskobj
  
    // Extract categoryId from nested object
    if (task.category && task.category.id) {
      this.taskobj.categoryId = task.category.id.toString();
    } else {
      this.taskobj.categoryId = null;
    }
  
    if (task.dueDate) {
      this.taskobj.dueDate = task.dueDate.split("T")[0]; // YYYY-MM-DD
    }
  }
  


  onUpdate() {
    this.taskService.UpdateTask(this.taskobj,this.headers).subscribe((res: any) => {
      console.log(res)
      //alert("Task Updated successfully");
      this.getTasks();
    })
  }

  onDelete(id: number) {
    const isDelete = confirm('are you sure?');
    if (isDelete) {
      this.taskService.DeleteTask(id,this.headers).subscribe((res: any) => {
        //alert("task deleted successfully");
        this.getTasks();
      })
    }
  }
}
