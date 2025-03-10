import { Category, ICategoryList } from './../../models/category';
import { Component } from '@angular/core';
import { CategoryServiceService } from '../../services/category-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categoryList: Category[] = [];

  categoryObj: ICategoryList = {
    "id": 0,
    "name": "",
    "description": "",
  }
  constructor(private categoryService: CategoryServiceService) {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.loadCategories().subscribe((result: any) => {
      this.categoryList = result;
    });
    this.onReset();
  }

  onEdit(data: any) {
    this.categoryObj = data
  }

  onReset() {
    this.categoryObj = new Category()
  }

  onSaveCategory() {
    this.categoryService.createNewCategory(this.categoryObj).subscribe((res: any) => {
      alert("Category created successfully");
      this.getCategories();
    })
  }

  onUpdate() {
    this.categoryService.UpdateCategory(this.categoryObj).subscribe((res: any) => {
      console.log(res)
      alert("Category Updated successfully");
      this.getCategories();
    })
  }

  onDelete(id: number) {
    const isDelete = confirm('are you sure');
    if (isDelete) {
      this.categoryService.DeleteCategory(id).subscribe((res: any) => {
        alert("Category deleted successfully");
        this.getCategories();
      })
    }
  }

  LoadTasks(obj:any){
    console.log(obj);
  }
}
