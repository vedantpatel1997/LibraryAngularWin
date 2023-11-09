import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-activebooks-admin',
  templateUrl: './user-activebooks-admin.component.html',
  styleUrls: ['./user-activebooks-admin.component.css'],
})
export class UserActivebooksAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('UserActivebooksAdminComponent ID: ', this.id);
  }
}
