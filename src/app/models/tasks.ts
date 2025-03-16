import { ICategoryList } from "./category";

export class Task {
    id: number;
    title: string;
    description: string;
    status: boolean;
    priority: number;
    dueDate: Date;
    category: ICategoryList | null;
    categoryId: null


    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.status = false;
        this.priority = 1;
        this.dueDate = new Date;
        this.categoryId = null;
        this.category = { id: 1, name: '',description:'' };  // Default empty category

    }
}

export interface ITaskList {
    id: number,
    title: string,
    description: string,
    status: boolean,
    priority: number,
    dueDate: Date | null,
    categoryId: null
    category: ICategoryList | null,

}