import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { IUserList } from '../../models/user';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: IUserList = {
      "id" : 0,
      "email": '',
      "password": ''
    }

  constructor(private authService:AuthServiceService){

  }

  router = inject(Router);
  http = inject(HttpClient);

  onLogin() {
    this.authService.toLogin(this.loginObj).subscribe((res: any) => {
      localStorage.setItem("AngularUserToken",res.token)
      this.router.navigateByUrl('admin');
    },errors =>{
      alert('Wrong Creditials');
    })
  }
}
