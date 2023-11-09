import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-history-admin',
  templateUrl: './user-history-admin.component.html',
  styleUrls: ['./user-history-admin.component.css'],
})
export class UserHistoryAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('UserHistoryAdminComponent ID: ', this.id);
  }
}
