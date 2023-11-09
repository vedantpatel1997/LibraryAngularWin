import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-mail-admin',
  templateUrl: './user-mail-admin.component.html',
  styleUrls: ['./user-mail-admin.component.css'],
})
export class UserMailAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('UserMailAdminComponent ID: ', this.id);
  }
}
