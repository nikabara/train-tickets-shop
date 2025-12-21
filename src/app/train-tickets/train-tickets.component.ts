import { SwaggerAPIService } from './../services/swagger-api.service';
import { Component, Input, Output, OnInit, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Train } from '../Interfaces/Train.interface';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ScheduleFilter } from '../Interfaces/ScheduleFilter.interface';
import { TrainService } from '../services/AppServices/train.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-train-tickets',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink, RouterModule],
  templateUrl: './train-tickets.component.html',
  styleUrls: ['./train-tickets.component.sass']
})
export class TrainTicketsComponent implements OnInit {
  @Input() scheduleData!: ScheduleFilter;

  ticketPrice: number | null = null;
  departureTime: string | null = null;
  trvelDuration: string | null = null;
  arrivalTime: string | null = null;
  departureFrom: string | null = null;
  departureTo: string | null = null;
  trainNumber: string | null = null;

  private readonly trainService: TrainService = inject(TrainService);

  constructor(private router: Router, private swaggerAPIService: SwaggerAPIService) { }

  public calculateTravelDuration(departure: string, arrival: string): string {
    if (!departure || !arrival) return 'N/A';

    // Parse ISO strings into Date objects
    const depDate = new Date(departure);
    const arrDate = new Date(arrival);

    // Calculate difference in milliseconds
    const diffMs = arrDate.getTime() - depDate.getTime();

    // Convert to hours and minutes
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}hr ${minutes}min`;
  }

  // @Output() selectTicket = new EventEmitter();

  // public onSelectTicket() : void {
  //   this.selectTicket.emit(this.scheduleData);
  // }

  passSelectedTicketData() : void {
    const serializedData: string = JSON.stringify(this.scheduleData);
    this.router.navigate(['/book-train-seats'], { queryParams: {data: serializedData} })
  }

  public train: any;

  ngOnInit(): void {
    if (this.scheduleData) {
      // 1. Assign dates from the Input immediately (these are usually the ISO strings)
      this.departureTime = this.scheduleData.departureDate;
      this.arrivalTime = this.scheduleData.arrivalDate;
      this.departureFrom = this.scheduleData.departureFrom;
      this.departureTo = this.scheduleData.arrivalAt;

      // 2. Calculate duration immediately using the data we already have
      if (this.departureTime && this.arrivalTime) {
          this.trvelDuration = this.calculateTravelDuration(this.departureTime, this.arrivalTime);
      }

      // 3. Fetch the additional Train info (like trainNumber) from the service
      this.trainService.GetTrain(this.scheduleData.trainId).subscribe({
        next: (response) => {
          if (response.isSuccess && response.data) {
            this.train = response.data;
            this.ticketPrice = 0;
            // Use the property that actually exists in your response
            this.trainNumber = response.data.trainNumber?.toString();

            // Only overwrite dates if the service actually provides them
            if (response.data.departureDate) {
                this.departureTime = response.data.departureDate;
                this.trvelDuration = this.calculateTravelDuration(this.departureTime!, this.arrivalTime!);
            }
          }
        }
      });
    }
  }
}
