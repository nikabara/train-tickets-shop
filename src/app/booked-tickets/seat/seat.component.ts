import { SeatService } from './../../services/AppServices/seat.service';
import { BookedTicketsComponent } from './../booked-tickets.component';
import { SwaggerAPIService } from './../../services/swagger-api.service';
import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SplitSeatNumberPipe } from '../../pipes/split-seat-number.pipe';
import { PriceToVagonClassPipe } from "../../pipes/price-to-vagon-class.pipe";
import Swal from 'sweetalert2';
import { TicketService } from '../../services/AppServices/ticket.service';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [QRCodeModule, TranslateModule, SplitSeatNumberPipe, PriceToVagonClassPipe],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.sass'
})
export class SeatComponent implements OnInit {

  private readonly seatService: SeatService = inject(SeatService);
  private readonly ticketService: TicketService = inject(TicketService);

  @Input() data!: any;

  public seatData: any;

  constructor(
    private translateService: TranslateService,
    private swaggerAPIService: SwaggerAPIService,
    private bookedTicketsComponent: BookedTicketsComponent
  ) { }

  ngOnInit(): void {
    this.seatService.GetSeat(this.data.seatId).subscribe({
      next: (seatResponse) => {
        if (seatResponse) {
          console.log(seatResponse.data, 'seat data')
          this.seatData = seatResponse.data;
        }
      }
    })

    console.log(this.data, 'data');
  }


  public cancelTicket(): void {

    Swal.fire({
      title: "Are you sure you want to cancel this ticket?",
      text: "This operation is not refundable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.CancelTicket(this.data.ticketId).subscribe({
          next: (ticketResponse) => {
            if (ticketResponse) {
              Swal.fire({
                title: "Ticket canceled",
                icon: "success"
              }).then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              })
            }
          }
        });
      }
    });
  }
}
