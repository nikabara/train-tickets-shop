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

  myTickets!: Ticket[];

  private userData!: any;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') ?? '');
    console.log(this.userData)
    this.swaggerAPIService.getTickets().subscribe(
      (response) => {
        this.myTickets = response;

        this.myTickets = this.myTickets.filter(x => x.email === this.userData.email);
        console.log(this.myTickets);
      }
    )

  }
}
