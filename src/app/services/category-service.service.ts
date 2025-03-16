import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  apiUrl: string = "http://localhost:5077/api/categories";

  constructor(private http: HttpClient) { }

  loadCategories() {
    return this.http.get(this.apiUrl );
  }

  createNewCategory(obj: any) {
    return this.http.post(this.apiUrl, obj);
  }

  UpdateCategory(obj: any) {
    return this.http.put(this.apiUrl +'/'+ obj.id, obj);
  }

  DeleteCategory(id: number) {
    return this.http.delete(this.apiUrl +'/'+ id);
  }
}
