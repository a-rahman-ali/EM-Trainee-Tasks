import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm: FormGroup;
  loginError = false;
  adminLoginMessage = false;
  emailNotRegistered = false;
  public showPassword = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
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

  ngOnInit(): void {
    // Check if the user is already authenticated
    if (this.authService.isAuthenticatedUser()) {
      // Redirect to user home route
      this.router.navigate(['/book-catalog']);
    }
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
          this.authService.userLogin(email, password).subscribe(loggedInUser => {
            if (loggedInUser) {
              if (this.authService.hasRole(loggedInUser, 'user')) {
                console.log("user logged in");
                this.router.navigate(['/book-catalog']);
              } else {
                console.log("Trying to Login as Admin? Switch to Admin");
  
                if (this.authService.hasRole(loggedInUser, 'admin')) {
                  this.adminLoginMessage = true;
  
                  setTimeout(() => {
                    this.adminLoginMessage = false;
                    console.log("Message hidden");
                  }, 3000);
                } else {
                  console.log("Invalid role for admin login");
                }
              }
            } else {
              console.log("user not logged in");
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
  
  switchToAdmin() {
    this.router.navigate(['/admin-login']);
  }

  switchToSignup() {
    this.router.navigate(['/signup']);
  }


}
