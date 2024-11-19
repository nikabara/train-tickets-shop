import { SwaggerAPIService } from '../../services/swagger-api.service';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Train } from '../../Interfaces/Train.interface';
import { Router } from '@angular/router';
import { Ticket } from '../../Interfaces/Ticket.interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-booked-ticket',
  standalone: true,
  imports: [CommonModule, SeatComponent],
  templateUrl: './booked-ticket.component.html',
  styleUrl: './booked-ticket.component.sass'
})
export class BookedTicketComponent implements OnInit {
  @Input() ticketData!: any;

  // departureTime: any;
  // travelDuration: any;
  // arrivalTime: any;
  // departureFrom: any;
  // departureTo: any;
  // trainNumber: any;

  // downloadTicket() : void {
  //   const elementToPrint = document.getElementById('print_ticket') as HTMLDivElement;

  //   html2canvas(elementToPrint, { scale: 15 }).then((canvas) => {
  //     const pdf = new jsPDF();

  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);

  //     pdf.setProperties({
  //       title: "ahh",
  //       subject: 'ahhhhhh',
  //       author: 'ahhh?!'
  //     });

  //     pdf.setFontSize(12);
  //     pdf.text("Ticket", 10, 10);
  //     pdf.save('myfile.pdf');
  //   })
  // }

  // public calculateTravelDuration(departure: string, arrival: string) : string {
  //   let departureTimeSplit:number[] = departure.split(':').map(x => Number(x));
  //   let arrivalTimeSplit:number[] = arrival.split(':').map(x => Number(x));

  //   let hourTimeDiference: number = Math.max(departureTimeSplit[0], arrivalTimeSplit[0]) - Math.min(departureTimeSplit[0], arrivalTimeSplit[0]);
  //   let minuteTimeDifference: number = Math.max(departureTimeSplit[1], arrivalTimeSplit[1]) - Math.min(departureTimeSplit[1], arrivalTimeSplit[1]);
  
  //   return `${hourTimeDiference}hr ${minuteTimeDifference}min`;
  // }

  // ngOnInit(): void {
  //   this.departureTime = this.ticketData.train.departure;
  //   this.travelDuration = this.calculateTravelDuration(this.ticketData.train.departure, this.ticketData.train.arrive);
  //   this.arrivalTime = this.ticketData.train.arrive;
  //   this.departureFrom = this.ticketData.train.from;
  //   this.departureTo = this.ticketData.train.to;
  //   this.trainNumber = this.ticketData.train.number;
  // }



  ngOnInit(): void {
    console.log(this.ticketData, 'tkt data')
  }
}
