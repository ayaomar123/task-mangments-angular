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
    id: number |null,
    name: string,
    description: string,
}