import { BookedTicketsComponent } from './../booked-tickets.component';
import { SwaggerAPIService } from './../../services/swagger-api.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SplitSeatNumberPipe } from '../../pipes/split-seat-number.pipe';
import { PriceToVagonClassPipe } from "../../pipes/price-to-vagon-class.pipe";

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [QRCodeModule, TranslateModule, SplitSeatNumberPipe, PriceToVagonClassPipe],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.sass'
})
export class SeatComponent implements OnInit {
  @Input() data!: any;

  constructor(
    private translateService: TranslateService,
    private swaggerAPIService: SwaggerAPIService,
    private bookedTicketsComponent: BookedTicketsComponent
  ) { }

  ngOnInit(): void {
    console.log(this.data, 'seatInfo');
  }


  public cancelTicket(): void {
    // this.swaggerAPIService.cancelTicket(this.data.ticketId).subscribe();
    window.location.reload();
  }
}
