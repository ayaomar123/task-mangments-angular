import { TaskService } from './../../services/task.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryServiceService } from './../../services/category-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StatusPipe } from '../../pipes/status.pipe';
import { PirorityPipe } from '../../pipes/pirority.pipe';
import { Category } from '../../models/category';
import { ITaskList, Task } from '../../models/tasks';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, DatePipe, StatusPipe, PirorityPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  categoriesList: Category[] = [];

  tasksList: Task[] = [];

  taskobj: ITaskList = {
    "id": 0,
    "title": "",
    "description": "",
    "status": false,
    "priority": 1,
    "dueDate": null,
    "category": { id: null, name: '', description: '' },
    "categoryId" : null
  }


  constructor(private taskService: TaskService) {
    this.getCategories();
    this.getTasks()
  }




  http = inject(HttpClient);

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('AngularUserToken')}`,
    'Content-Type': 'application/json'
  });


  getCategories() {
    this.http.get("http://localhost:5077/api/categories").subscribe((result: any) => {
      this.categoriesList = result;
    });
  }

  getTasks() {

    this.taskService.loadTask(this.headers).subscribe((result: any) => {
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
    this.taskobj = new Task()
  }


  onSave() {
    this.taskService.createNewTask(this.taskobj, this.headers).subscribe((res: any) => {
      this.getTasks();
    })
  }

  onEdit(task: any) {
    this.taskobj = { ...task }; // Copy task data into taskobj

    if (task.category && task.category.id) {
      this.taskobj.categoryId = task.category.id.toString();
    }

    if (task.dueDate) {
      this.taskobj.dueDate = task.dueDate.split("T")[0]; // YYYY-MM-DD
    }
  }



  onUpdate() {
    this.taskService.UpdateTask(this.taskobj, this.headers).subscribe((res: any) => {
      //alert("Task Updated successfully");
      this.getTasks();
    })
  }

  onDelete(id: number) {
    const isDelete = confirm('are you sure?');
    if (isDelete) {
      this.taskService.DeleteTask(id, this.headers).subscribe((res: any) => {
        //alert("task deleted successfully");
        this.getTasks();
      })
    }
  }
}
