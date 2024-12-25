import { SwaggerAPIService } from '../../services/swagger-api.service';
import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Train } from '../../Interfaces/Train.interface';
import { Router } from '@angular/router';
import { Ticket } from '../../Interfaces/Ticket.interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { SeatComponent } from '../seat/seat.component';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HiddenTicketService } from '../../services/hidden-ticket.service';
import { TicketPdfComponent } from "../../ticket-pdf/ticket-pdf.component";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-booked-ticket',
  standalone: true,
  imports: [CommonModule, SeatComponent, TranslateModule, TicketPdfComponent],
  templateUrl: './booked-ticket.component.html',
  styleUrl: './booked-ticket.component.sass'
})
export class BookedTicketComponent implements OnInit {
  @Input() ticketData!: any;

  constructor(private router: Router, private hiddenTicketService: HiddenTicketService) { }

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  generatePDF() {
    const element = this.pdfContent.nativeElement;

    html2canvas(element, {
      ignoreElements: (node) => {
        return node.classList && node.classList.contains('exclude-from-pdf');
      },
    }).then((canvas) => {
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

  underDevelopment(): void {
    Swal.fire({
      icon: "info",
      title: "Print invoice under development",
    })
  }

  ngOnInit(): void {
    console.log(this.ticketData, 'tkt data')
  }


}
