import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: ''
  }

  router = inject(Router);
  http = inject(HttpClient);

  onLogin() {
    // if (this.loginObj.email === 'admin' && this.loginObj.password === '1122') {
    //   this.router.navigateByUrl('admin')
    // } else {
    //   alert('Wrong Creditials');
    // }

    this.http.post("http://localhost:5077/api/Auth/login",this.loginObj).subscribe((res: any) => {
      localStorage.setItem("AngularUserToken",res.token)
      this.router.navigateByUrl('admin');
    },errors =>{
      alert('Wrong Creditials');
    })
  }
}
