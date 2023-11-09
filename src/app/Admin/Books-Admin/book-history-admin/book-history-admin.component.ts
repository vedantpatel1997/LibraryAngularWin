import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-history-admin',
  templateUrl: './book-history-admin.component.html',
  styleUrls: ['./book-history-admin.component.css'],
})
export class BookHistoryAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
  }
}
