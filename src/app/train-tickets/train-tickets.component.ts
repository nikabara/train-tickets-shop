import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Train } from '../Interfaces/Train.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-tickets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './train-tickets.component.html',
  styleUrls: ['./train-tickets.component.sass']
})
export class TrainTicketsComponent implements OnInit {
  @Input() trainData!: Train;

  ticketPrice: number | null = null;
  departureTime: string | null = null;
  trvelDuration: string | null = null;
  arrivalTime: string | null = null;
  departureFrom: string | null = null;
  departureTo: string | null = null;
  trainNumber: string | null = null;

  constructor(private router: Router) { }

  public calculateTravelDuration(departure: string, arrival: string) : string {
    let departureTimeSplit:number[] = departure.split(':').map(x => Number(x));
    let arrivalTimeSplit:number[] = arrival.split(':').map(x => Number(x));

    let hourTimeDiference: number = Math.max(departureTimeSplit[0], arrivalTimeSplit[0]) - Math.min(departureTimeSplit[0], arrivalTimeSplit[0]);
    let minuteTimeDifference: number = Math.max(departureTimeSplit[1], arrivalTimeSplit[1]) - Math.min(departureTimeSplit[1], arrivalTimeSplit[1]);
  
    return `${hourTimeDiference}hr ${minuteTimeDifference}min`;
  }

  @Output() selectTicket = new EventEmitter();

  public onSelectTicket() : void {
    this.selectTicket.emit(this.trainData);
  }

  passSelectedTicketData() : void {
    const serializedData: string = JSON.stringify(this.trainData);
    this.router.navigate(['/book-train-seats'], { queryParams: {data: serializedData} })
  }

  ngOnInit(): void {
    if (this.trainData) {
      this.ticketPrice = 0;
      this.departureTime = this.trainData.departure;
      this.trvelDuration = this.calculateTravelDuration(this.trainData.departure, this.trainData.arrive);
      this.arrivalTime = this.trainData.arrive;
      this.departureFrom = this.trainData.from;
      this.departureTo = this.trainData.to;
      this.trainNumber = this.trainData.number.toString();
    }
  }
}