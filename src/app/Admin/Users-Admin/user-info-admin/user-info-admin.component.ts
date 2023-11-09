import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info-admin',
  templateUrl: './user-info-admin.component.html',
  styleUrls: ['./user-info-admin.component.css'],
})
export class UserInfoAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('UserInfoAdminComponent ID: ', this.id);
  }
}
