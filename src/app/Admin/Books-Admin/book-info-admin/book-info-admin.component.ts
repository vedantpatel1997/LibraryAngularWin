import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-info-admin',
  templateUrl: './book-info-admin.component.html',
  styleUrls: ['./book-info-admin.component.css'],
})
export class BookInfoAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('BookInfo ID: ', this.id);
  }
}
