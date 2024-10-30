import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/interfaces/user/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService) {}

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set('USER_INFO', response?.token);

            this.loginForm.reset();
          }
        },
        error: (err) => console.log(err)
      });
    }
  }

  onSubmitSignupForm(): void {
    if(this.signupForm.value && this.signupForm.valid){
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if(response) {
              alert('Usuário criado com sucesso');
              this.signupForm.reset();
              this.loginCard = true;
            }
          },
          error: (error) => {
            console.log(error);
          }
        })
    }
  }
}
