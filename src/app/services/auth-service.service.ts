import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl: string = "http://localhost:5077/api/Auth/";

  constructor(private http: HttpClient) { }

  toRegister(obj: any) {
    return this.http.post(this.apiUrl + "register",obj);
  }

  toLogin(obj: any) {
    return this.http.post(this.apiUrl + "login",obj);
  }
}
