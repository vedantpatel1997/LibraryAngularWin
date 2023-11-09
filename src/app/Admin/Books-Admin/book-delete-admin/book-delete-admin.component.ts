import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-delete-admin',
  templateUrl: './book-delete-admin.component.html',
  styleUrls: ['./book-delete-admin.component.css'],
})
export class BookDeleteAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('BookInfo ID: ', this.id);
  }
}
