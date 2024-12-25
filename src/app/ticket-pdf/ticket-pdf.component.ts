import { Component, ElementRef, Input, input, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HiddenTicketService } from '../services/hidden-ticket.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ticket-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-pdf.component.html',
  styleUrl: './ticket-pdf.component.sass'
})
export class TicketPdfComponent implements OnInit {
  constructor(private hiddenTicketService: HiddenTicketService) { }

  @Input() ticketData!: any;

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  ngOnInit(): void {
    this.hiddenTicketService.registerComponent(this);
    console.log(this.ticketData, 'data from hidden component')
    // console.log(this.data, 'rec data');
  }

  totalPrice(): number {
    let sum: number = 0;

    for (let i = 0; i < this.ticketData.persons.length; i++) {
      sum += this.ticketData.persons[i].seat.price;
    }

    return sum;
  }

  generatePDF() {
    const element = this.pdfContent.nativeElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // A4 page width in mm
      const pageHeight = 277; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 20;

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

      // Save the PDF
      pdf.save('invoice.pdf');
    });
  }
}
