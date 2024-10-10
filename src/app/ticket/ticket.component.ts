import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.sass'
})
export class TicketComponent {
	genPdf() {
		const htmlElement: any = document.querySelector(".qrcodeImage");
		
		html2canvas(htmlElement, {scale: 2}).then((canvas) => {
			const pdf = new jsPDF();
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 20, 20);

			pdf.save('ticket.pdf')
		})

	}
}
