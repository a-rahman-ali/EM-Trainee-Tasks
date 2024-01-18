import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookCatalogComponent } from './components/book-catalog/book-catalog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchCategorizeComponent } from './components/search-categorize/search-categorize.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { IssueBooksComponent } from './components/issue-books/issue-books.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-login', pathMatch: 'full' },
  { path: 'book-catalog', 
    component: BookCatalogComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'books/:id', component: BookDetailsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'search-n-categorize', 
    component: SearchCategorizeComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
    canActivate: [AuthGuard]
  },
  { path: 'issue-books', 
    component: IssueBooksComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'manage-books',
    component: ManageBooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [AuthGuard]
  },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin-login', component: AdminLoginComponent},
  { path : '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
