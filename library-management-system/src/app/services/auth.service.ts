import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { IUser } from '../models/IUser';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  private users: IUser[] = [];
  private isAuthenticatedUserValue = false;
  private isAuthenticatedAdminValue = false;
  currentUser: IUser | null = null;
  private storageKey: string = "isLoggedIn"

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.getUsers().subscribe((users) => {
      this.users = users;
    });

    const storedLoginState = sessionStorage.getItem(this.storageKey);
    if (storedLoginState) {
      const loginState = JSON.parse(storedLoginState);
      this.isAuthenticatedUserValue = loginState.isAuthenticatedUser;
      this.isAuthenticatedAdminValue = loginState.isAuthenticatedAdmin;
      this.currentUser = loginState.currentUser;
    }
  }
  updateStorage(): void {
    const loginState = {
      isAuthenticatedUser: this.isAuthenticatedUserValue,
      isAuthenticatedAdmin: this.isAuthenticatedAdminValue,
      currentUser: this.currentUser,
    };
    sessionStorage.setItem(this.storageKey, JSON.stringify(loginState));
  }
  isEmailRegistered(email: string): Observable<boolean> {
    const url = `${this.apiUrl}/users?email=${email.toLowerCase()}`;

    return this.http.get<any[]>(url).pipe(
      map((users: any[]) => users.length > 0),
      catchError(() => of(false))
    );
  }

  hasRole(user: IUser | null, role: string): boolean {
    return user?.role === role;
  }

  getUsers(): Observable<IUser[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<IUser[]>(url).pipe(
      map((users) => {
        return users.map(user => ({ ...user, borrowedBooks: user.borrowedBooks || [], pendingBorrows: user.pendingBorrows || [] }));
      })
    );
  }

  registerUser(newUser: IUser): Observable<IUser> {
    const userWithBorrowedBooks: IUser = { ...newUser, borrowedBooks: [], pendingBorrows:[] };

    const url = `${this.apiUrl}/users`;
    return this.http.post<IUser>(url, userWithBorrowedBooks).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error registering user:', error);
        throw error;
      })
    );
  }

  userLogin(email: string, password: string): Observable<IUser | null> {
    return this.isEmailRegistered(email.toLowerCase()).pipe(
      switchMap((isRegistered) => {
        if (isRegistered) {
          const user = this.users.find(
            (u) =>
              u.email.toLowerCase() === email.toLowerCase() &&
              u.password === password
          );

          if (user?.role==='user') {
            this.setCurrentUser(user);
            this.isAuthenticatedUserValue = true;
          }
          
          return of(user || null);
        } else {
          return of(null);
        }
      })
    );
  }
  adminLogin(email: string, password: string): Observable<IUser | null> {
    return this.isEmailRegistered(email.toLowerCase()).pipe(
      switchMap((isRegistered) => {
        if (isRegistered) {
          const user = this.users.find(
            (u) =>
              u.email.toLowerCase() === email.toLowerCase() &&
              u.password === password
          );

          if (user?.role=='admin') {
            this.setCurrentUser(user);
            this.isAuthenticatedAdminValue = true;
          }

          return of(user || null);
        } else {
          return of(null);
        }
      })
    );
  }
  
  isAuthenticatedUser(): boolean {
    return this.isAuthenticatedUserValue;
  }
  isAuthenticatedAdmin(): boolean {
    return this.isAuthenticatedAdminValue;
  }

  logout(): void {
    this.isAuthenticatedUserValue = false;
    this.isAuthenticatedAdminValue = false;
    this.setCurrentUser(null);
  }

  getCurrentUser(): IUser | null {
    // console.log('Current User:', this.currentUser);
    return this.currentUser;
  }

  private setCurrentUser(user: IUser | null): void {
    this.currentUser = user;
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/users/${userId}`;

    return this.http.delete<void>(url).pipe(
      switchMap(() => {
        this.users = this.users.filter(user => user.id !== userId);

        this.users = this.users.map(user => ({ ...user, borrowedBooks: user.borrowedBooks}));

        this.updateStorage();

        return of(void 0);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  }
  
}
