import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationComponent } from './components/logout-confirmation/logout-confirmation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-management-system';
  constructor(protected authService: AuthService, private router: Router, private dialog: MatDialog){}
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Update the storage on browser unload
    this.authService.updateStorage();
  }
  ngOnInit(){}
  login(){
    this.router.navigate(['/user-login']);
  }

  openLogoutConfirmationDialog(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/user-login']);
  }
}
