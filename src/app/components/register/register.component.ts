import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { IUserList } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regObj: IUserList = {
    "id" : 0,
    "email": '',
    "password": ''
  }

  passwordError = '';

  constructor(private authService: AuthServiceService) {

  }

  router = inject(Router);
  http = inject(HttpClient);

  onRegister() {
    this.authService.toRegister(this.regObj).subscribe((res: any) => {
      if (res.code === 200) {
        this.router.navigateByUrl('login');
      }
    },
      (error: any) => {
        //debugger;
        if (error.error.errors && error.error.errors.length > 0) {
          this.passwordError = error.error.errors[0].description
        } else {
          alert("Error Code:"+error.error.code +"msg:" +error.error.message);
        }
      }
    );

  }
}
