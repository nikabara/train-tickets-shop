import { JwtService } from './../services/AppServices/JWT/jwt.service';
import { SwaggerAPIService } from './../services/swagger-api.service';
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Ticket } from '../Interfaces/Ticket.interface';
import { BookedTicketComponent } from "./booked-ticket/booked-ticket.component";
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TicketPdfComponent } from "../ticket-pdf/ticket-pdf.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../services/loader.service';
import { RouterModule } from '@angular/router';
import { TicketService } from '../services/AppServices/ticket.service';


@Component({
  selector: 'app-booked-tickets',
  standalone: true,
  imports: [BookedTicketComponent, CommonModule, TranslateModule, TicketPdfComponent, MatProgressSpinnerModule, RouterModule],
  templateUrl: './booked-tickets.component.html',
  styleUrl: './booked-tickets.component.sass'
})
export class BookedTicketsComponent implements OnInit {

  private readonly ticketService: TicketService = inject(TicketService);
  private readonly jwtService: JwtService = inject(JwtService);

  constructor(private swaggerAPIService: SwaggerAPIService, public loaderService: LoaderService) {

   }

  myTickets!: any[];

  groupedTickets!: any[][];

  private userData!: any;

  ngOnInit(): void {
    let decodedToken: any = this.jwtService.decodeToken(localStorage.getItem('jwt_access_token_user')!);

    let userStringId = decodedToken.nameid;

    let userId = Number.parseInt(userStringId);

    this.ticketService.GetAllUserTickets(userId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.myTickets = response.data;
          console.log(this.myTickets, "my tickets")
        }
      }
    })
    // this.swaggerAPIService.getTickets().subscribe(
    //   (response) => {
    //     this.myTickets = response;
    //     this.myTickets = this.myTickets.filter(x => x.email === this.userData.email);
    //     this.groupedTickets = this.groupSimilarBookings();
    //     console.log(this.groupedTickets, 'grouped Tickets');
    //   }
    // )


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
