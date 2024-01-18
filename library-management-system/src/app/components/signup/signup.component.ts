import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { Observable, catchError, debounceTime, map, of } from 'rxjs';

@Component({
  selector: 'app-user-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  showSuccessMessage = false;
  
  public showPassword = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
          ],
          asyncValidators: [this.emailValidator()],
          updateOn: 'blur' // Trigger validation on blur
        },
      ],
      username: [
        '', 
        [Validators.required, Validators.minLength(4), this.noSpacesValidator]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        ]
      ],
      role: ['user', [Validators.required]]
    });
  }
  emailValidator(): AsyncValidatorFn {
      // Async validator function for checking if the email is already registered
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return this.authService.isEmailRegistered(control.value).pipe(
          debounceTime(300), // Debounce time to avoid rapid API calls
          map(isRegistered => (isRegistered ? { 'emailExists': true } : null)),
          catchError(() => of(null))
        );
      };
    }

    noSpacesValidator(control: AbstractControl): ValidationErrors | null {
      if (control.value && /\s/.test(control.value)) {
        return { 'noSpaces': true }; 
      }
      return null;
    }
  onSignup() {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      const { username, password, firstName, lastName, email, role } = this.signupForm.value;
      const newUser: IUser = {
        id:0,
        username,
        password,
        firstName,
        lastName,
        email,
        role,
      };
  
      this.authService.registerUser(newUser).subscribe(
        (registeredUser: IUser) => {
          console.log('User registered successfully:', registeredUser);
  
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/user-login']);
          }, 3000);
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    }
  }

  backToLogin() {
    this.router.navigate(['/user-login']);
  }
}
