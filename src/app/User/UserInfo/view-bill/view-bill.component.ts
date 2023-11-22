import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingSummary } from 'src/app/DTO/BillingDetails';
import { BooksService } from 'src/app/Services/books.service';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css'],
})
export class ViewBillComponent {
  curBill: number;
  spinnerVisible: boolean = false;
  billingDetails: BillingSummary;
  totalRentedBooksPrice: number = 0;

  constructor(private route: ActivatedRoute, private bookSvc: BooksService) {
    this.route.params.subscribe((p) => {
      this.curBill = p['billId'];
    });
  }

  ngOnInit(): void {
    this.spinnerVisible = true;
    this.bookSvc.GetBillByBillId(this.curBill).subscribe({
      next: (APIResult) => {
        if (APIResult.isSuccess) {
          this.billingDetails = APIResult.data;
          this.billingDetails.billingBooksInfos.forEach(
            (cur) => (this.totalRentedBooksPrice += cur.bookRentPrice)
          );
          this.spinnerVisible = false;
        }
        this.spinnerVisible = false;
      },
      error: (error) => {
        // Handle the error here
        console.log(error);
        this.spinnerVisible = false;
        this.bookSvc.showMessage(
          `<i class="fa-solid fa-triangle-exclamation fa-lg"></i>  Something went wrong while getting the data!`,
          'danger'
        );
      },
    });
  }
}
