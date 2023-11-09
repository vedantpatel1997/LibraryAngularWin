import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-delete-admin',
  templateUrl: './user-delete-admin.component.html',
  styleUrls: ['./user-delete-admin.component.css'],
})
export class UserDeleteAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('UserDeleteAdminComponent ID: ', this.id);
  }
}
