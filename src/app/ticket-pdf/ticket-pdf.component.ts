import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HiddenTicketService } from '../services/hidden-ticket.service';


@Component({
  selector: 'app-ticket-pdf',
  standalone: true,
  imports: [],
  templateUrl: './ticket-pdf.component.html',
  styleUrl: './ticket-pdf.component.sass'
})
export class TicketPdfComponent implements OnInit {
  data: any = null; // Data to process

  constructor(private hiddenTicketService: HiddenTicketService) { }

  setData(data: any) {
    this.data = data; // Initialize the data when received
  }

  generatePdf() {
    console.log(this.data, 'rec data');

    const elementToPrint = document.getElementById('print_ticket') as HTMLDivElement;

    html2canvas(elementToPrint, { scale: 15 }).then((canvas) => {
      const pdf = new jsPDF();

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);

      pdf.setProperties({
        title: "ahh",
        subject: 'ahhhhhh',
        author: 'ahhh?!'
      });

      pdf.setFontSize(12);
      pdf.text("Ticket", 10, 10);
      pdf.save('myfile.pdf');
    })
  }

  ngOnInit(): void {
    this.hiddenTicketService.registerComponent(this);
    // console.log(this.data, 'rec data');
  }
}
