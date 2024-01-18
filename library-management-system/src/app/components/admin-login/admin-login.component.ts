import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loginError = false;
  emailNotRegistered = false;
  adminLoginMessage = false;
  public showPassword = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  constructor(private fb: FormBuilder, protected authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        ]
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.isEmailRegistered(email).subscribe(isRegistered => {
        if (!isRegistered) {
          this.emailNotRegistered = true;

          setTimeout(() => {
            this.emailNotRegistered = false;
          }, 3000);
        } else {
          this.authService.adminLogin(email, password).subscribe(loggedInAdmin => {
            if (loggedInAdmin) {
              if (this.authService.hasRole(loggedInAdmin, 'admin')) {
                console.log("admin logged in");
                this.router.navigate(['/book-catalog']);
              } else {
                console.log("Trying to Login as User? Switch to User");

                this.adminLoginMessage = true;

                setTimeout(() => {
                  this.adminLoginMessage = false;
                  console.log("Message hidden");
                }, 3000);
              }
            } else {
              console.log("admin not logged in");
              this.loginError = true;

              setTimeout(() => {
                this.loginError = false;
              }, 3000);
            }
          });
        }
      });
    }
  }

  switchToUser() {
    this.router.navigate(['/user-login']);
  }
}
