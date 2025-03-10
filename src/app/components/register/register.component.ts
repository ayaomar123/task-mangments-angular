import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule,RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regObj: any = {
    email: '',
    password: ''
  }

  router = inject(Router);
  http = inject(HttpClient);

  onRegister() {
    // if (this.loginObj.email === 'admin' && this.loginObj.password === '1122') {
    //   this.router.navigateByUrl('admin')
    // } else {
    //   alert('Wrong Creditials');
    // }

    this.http.post("http://localhost:5077/api/Auth/register", this.regObj).subscribe(
      (res: any) => {
        if(res.code === 200){
          this.router.navigateByUrl('login');
        }        
      },
      (error) => {
        console.error("Error response:", error);
        
        if (error.error && Array.isArray(error.error) && error.error.length > 0) {
          alert(error.error[0].description); 
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    );
    
  }
}
