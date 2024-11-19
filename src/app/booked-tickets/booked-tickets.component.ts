import { SwaggerAPIService } from './../services/swagger-api.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Ticket } from '../Interfaces/Ticket.interface';
import { BookedTicketComponent } from "./booked-ticket/booked-ticket.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-booked-tickets',
  standalone: true,
  imports: [BookedTicketComponent, CommonModule],
  templateUrl: './booked-tickets.component.html',
  styleUrl: './booked-tickets.component.sass'
})
export class BookedTicketsComponent implements OnInit {

  constructor(private swaggerAPIService: SwaggerAPIService) { }

  myTickets!: any[];

  groupedTickets!: any[][];

  private userData!: any;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') ?? '');
    console.log(this.userData)
    this.swaggerAPIService.getTickets().subscribe(
      (response) => {
        this.myTickets = response;
        this.myTickets = this.myTickets.filter(x => x.email === this.userData.email);
        this.groupedTickets = this.groupSimilarBookings(); 
        console.log(this.groupedTickets, 'grouped Tickets');
      }
    )
  }

  // Group similar bookings
  groupSimilarBookings(): any[][] {
    const groupedTickets: any[][] = [];

    for (const ticket of this.myTickets) {
        // Find a group with the same train number
        const existingGroup = groupedTickets.find(group => 
          group[0]?.train.number === ticket.train.number &&
          group[0]?.train.name === ticket.train.name &&
          group[0]?.train.date === ticket.train.date
        );

        if (existingGroup) {
            // Add the ticket to the existing group
            existingGroup.push(ticket);
        } else {
            // Create a new group for this ticket
            groupedTickets.push([ticket]);
        }
    }

    // console.log(groupedTickets);
    return groupedTickets;
  }
}
