import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-activeuser-admin',
  templateUrl: './book-activeuser-admin.component.html',
  styleUrls: ['./book-activeuser-admin.component.css'],
})
export class BookActiveuserAdminComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    console.log('BookInfo ID: ', this.id);
  }
}
