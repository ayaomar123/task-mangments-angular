export class User{
    id: number;
    email: string;
    password: string;

    constructor(){
        this.id =0;
        this.email='';
        this.password='';
    }
}


export interface IUserList{
    id: number |null,
    email: string,
    password: string,
}