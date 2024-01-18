import { EventEmitter, NgModule, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTableModule } from '@angular/material/table';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { BookCatalogComponent } from './components/book-catalog/book-catalog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchCategorizeComponent } from './components/search-categorize/search-categorize.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { LogoutConfirmationComponent } from './components/logout-confirmation/logout-confirmation.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { IssueBooksComponent } from './components/issue-books/issue-books.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    AdminLoginComponent,
    SignupComponent,
    BookCatalogComponent,
    NotFoundComponent,
    SearchCategorizeComponent,
    BookDetailsComponent,
    MyBooksComponent,
    ManageBooksComponent,
    LogoutConfirmationComponent,
    ManageUsersComponent,
    IssueBooksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatTableModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
