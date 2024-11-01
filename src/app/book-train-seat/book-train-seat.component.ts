import { SwaggerAPIService } from './../services/swagger-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seat } from '../Interfaces/Seat.interface';
import { Vagon } from '../Interfaces/Vagon.interface';
import { SeatComponent } from "./seat/seat.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-train-seat',
  standalone: true,
  imports: [SeatComponent, CommonModule],
  templateUrl: './book-train-seat.component.html',
  styleUrl: './book-train-seat.component.sass'
})
export class BookTrainSeatComponent implements OnInit, OnDestroy {
  dataLog() {
    throw new Error('Method not implemented.');
  }
  private activatedRoutSubscription!: Subscription;
  private getVagonSeatsSubscription!: Subscription;

  _queryParams!: any;

  // vagon!: Vagon[];

  businessClassSeats!: Seat[];
  firstClassSeats!: Seat[];
  secondClassSeats!: Seat[];

  constructor(private activatedRout: ActivatedRoute, private swaggerAPIService: SwaggerAPIService) { }

  ngOnInit(): void {
    this.activatedRoutSubscription = this.activatedRout.queryParamMap.subscribe(
      (response) => {
        const data = response.get('data');
        if (data) {
          this._queryParams = JSON.parse(data);
          console.log(this._queryParams)
        }
        else {
          console.warn('No data found in query params')
        }
      }
    )

    this.getSeatsByVagonId(this._queryParams.id);
  }

  sortSeatNames = (a: string, b: string): number => {
    const rowA = parseInt(a.slice(0, -1)); // Get the numeric part (row)
    const rowB = parseInt(b.slice(0, -1));

    // Compare by row first
    if (rowA !== rowB) {
      return rowA - rowB;
    }

    // If rows are the same, compare by seat position
    return a.charAt(a.length - 1).localeCompare(b.charAt(b.length - 1));
  };

  private getSeatsByVagonId(_trainId: number) {
    this.getVagonSeatsSubscription = this.swaggerAPIService.getVagons().subscribe(
      (response) => {
        const vagon: Vagon[] = response.filter((x: Vagon) => x.trainId === _trainId);
        this.firstClassSeats = vagon[0].seats.sort((a, b) => {
          // Extract the numeric part and letter part from each seat number
          const [aRow, aSeat] = [parseInt(a.number), a.number.slice(-1)];
          const [bRow, bSeat] = [parseInt(b.number), b.number.slice(-1)];

          // Compare by row (numeric part) first
          if (aRow !== bRow) {
            return aRow - bRow;
          }

          // If rows are the same, compare by seat letter (alphabetic part)
          return aSeat.localeCompare(bSeat);
        })

        this.secondClassSeats = vagon[1].seats.sort((a, b) => {
          // Extract the numeric part and letter part from each seat number
          const [aRow, aSeat] = [parseInt(a.number), a.number.slice(-1)];
          const [bRow, bSeat] = [parseInt(b.number), b.number.slice(-1)];

          // Compare by row (numeric part) first
          if (aRow !== bRow) {
            return aRow - bRow;
          }

          // If rows are the same, compare by seat letter (alphabetic part)
          return aSeat.localeCompare(bSeat);
        })

        this.businessClassSeats = vagon[2].seats.sort((a, b) => {
          // Extract the numeric part and letter part from each seat number
          const [aRow, aSeat] = [parseInt(a.number), a.number.slice(-1)];
          const [bRow, bSeat] = [parseInt(b.number), b.number.slice(-1)];

          // Compare by row (numeric part) first
          if (aRow !== bRow) {
            return aRow - bRow;
          }

          // If rows are the same, compare by seat letter (alphabetic part)
          return aSeat.localeCompare(bSeat);
        })
        console.log("II", this.secondClassSeats, "I", this.firstClassSeats, "BSN", this.businessClassSeats);

      },
      (error) => {
        throw new Error(`Error fetching vagon/seat data to book-train-seat component ${error}`);
      }
    )
  }


  clickedSeatData!: Seat;

  seatPrice: number = 0;
  seatNumber: string = "";

  getSeatData(data: Seat): void {
    this.clickedSeatData = data;
    this.seatPrice = data.price;
    this.seatNumber = data.number;
  }

  ngOnDestroy(): void {
    this.activatedRoutSubscription.unsubscribe();
    this.getVagonSeatsSubscription.unsubscribe();
  }
}
