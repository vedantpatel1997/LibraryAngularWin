import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/DTO/User';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
})
export class UsersAdminComponent {
  users: User[] = [];

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'gender',
    'email',
    'phone',
    'username',
    'role',
    'action',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userSvc: UsersService, private router: Router) {
    // Assign the data to the data source for the table to render
    this.userSvc.GetAllUsers().subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.users = APIResult.data;
          this.users.forEach((cur, i) => {
            cur.id = i + 1;
          });
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(APIResult);
        }
      },
      error: (error) => {
        // Handle the error here
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showUserDetails(userId: number) {
    // Here, you can navigate to a book details page or display a dialog with book details.
    // You have access to the bookId to load the details of the selected book.
    console.log('UserId: ', userId);
    this.router.navigateByUrl(`Admin/Users/Info/${userId}`);
  }
}
