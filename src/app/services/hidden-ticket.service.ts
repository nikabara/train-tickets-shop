import { Injectable } from '@angular/core';
import { TicketPdfComponent } from '../ticket-pdf/ticket-pdf.component';

@Injectable({
  providedIn: 'root'
})
export class HiddenTicketService {
  private ticketPdfComponent!: TicketPdfComponent;

  registerComponent(component: TicketPdfComponent) {
    this.ticketPdfComponent = component;
  }

  setData(data: any) {
    this.ticketPdfComponent.setData(data); // Pass data to the hidden component
  }

  generatePdf() {
    this.ticketPdfComponent.generatePdf(); // Trigger PDF generation
  }

  constructor() { }
}
