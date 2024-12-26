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

  async generatePDF() {
    const element = this.pdfContent.nativeElement;
    const tickets = element.querySelectorAll('app-seat'); // Wrapper for each ticket
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i] as HTMLElement;

      // Use html2canvas to render the current ticket
      const canvas = await html2canvas(ticket, {
        ignoreElements: (node) =>
          node.classList && node.classList.contains('exclude-from-pdf'),
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

      // Add a new page if this is not the last ticket
      if (i < tickets.length - 1) {
        pdf.addPage();
      }
    }

    // Save the PDF after processing all tickets
    pdf.save('tickets.pdf');
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
