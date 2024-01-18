import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  displayedColumns: string[] = ['id', 'username', 'email', 'borrowedBooksCount', 'delete'];
  dataSource: MatTableDataSource<IUser>; 

  constructor(private authService: AuthService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((users: IUser[]) => {
      const filteredUsers = users.filter(user => user.role !== 'admin');
      
      this.dataSource.data = filteredUsers;
    });
  }

  onDeleteUser(user: IUser): void {
    this.authService.deleteUser(user.id!).subscribe(
      () => {
        console.log('User deleted successfully');
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

}
