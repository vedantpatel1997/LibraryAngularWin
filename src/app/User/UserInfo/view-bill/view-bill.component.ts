import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingSummary } from 'src/app/DTO/BillingDetails';
import { BooksService } from 'src/app/Services/books.service';
import html2pdf from 'html2pdf.js';

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
        this.spinnerVisible = false;
        this.bookSvc.showMessage(
          `<i class="fa-solid fa-triangle-exclamation fa-lg"></i>  Something went wrong while getting the data!`,
          'danger'
        );
      },
    });
  }

  // sendEmail(userId: number) {
  //   const element = document.getElementById('card');
  //   const invoiceNameElement = document.getElementById('invoiceId');

  //   if (!invoiceNameElement) {
  //     console.error("Element with ID 'invoiceId' not found.");
  //     return;
  //   }

  //   const invoiceName = invoiceNameElement.innerText.trim(); // Use innerText and trim to remove leading/trailing whitespaces
  //   let pdfBytes = html2pdf(element);
  //   console.log('PDF file', pdfBytes);

  //   this.spinnerVisible = true;
  //   this.bookSvc.sendPDF(pdfBytes, userId, invoiceName).subscribe({
  //     next: (APIResult) => {
  //       if (APIResult.isSuccess) {
  //         this.bookSvc.showMessage(`Successfully sent bill`, 'success');
  //         this.spinnerVisible = false;
  //       }
  //       this.spinnerVisible = false;
  //     },
  //     error: (error) => {
  //       // Handle the error here
  //       this.spinnerVisible = false;
  //       this.bookSvc.showMessage(
  //         `<i class="fa-solid fa-triangle-exclamation fa-lg"></i> Something went wrong while getting the data!`,
  //         'danger'
  //       );
  //     },
  //   });
  // }

  downloadPDF() {
    const invoiceName = document
      .getElementById('invoiceId')
      .innerText.trim()
      .replace('Paid', '')
      .trim();
    let options = {
      margin: 0,
      filename: `${invoiceName}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    const pEl = document.getElementById('myInvoice');
    console.log(pEl);
    html2pdf().from(pEl).set(options).save();
  }
}
