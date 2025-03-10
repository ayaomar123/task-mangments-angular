export class Category{
    id: number;
    name: string;
    description: string;

    constructor(){
        this.id =0;
        this.name='';
        this.description='';
    }
}


export interface ICategoryList{
    id: number,
    name: string,
    description: string,
}