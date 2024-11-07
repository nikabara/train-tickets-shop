import { RegisterTicket } from './../Interfaces/RegisterTicket.interface';
import { SwaggerAPIService } from './../services/swagger-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seat } from '../Interfaces/Seat.interface';
import { Vagon } from '../Interfaces/Vagon.interface';
import { SeatComponent } from "./seat/seat.component";
import { CommonModule } from '@angular/common';
import { SelectedTicketInfoComponent } from "./selected-ticket-info/selected-ticket-info.component";
import Swal from 'sweetalert2';
import { People } from '../Interfaces/People.interface';
import { Ticket } from '../Interfaces/Ticket.interface';

@Component({
  selector: 'app-book-train-seat',
  standalone: true,
  imports: [SeatComponent, CommonModule, SelectedTicketInfoComponent],
  templateUrl: './book-train-seat.component.html',
  styleUrl: './book-train-seat.component.sass'
})
export class BookTrainSeatComponent implements OnInit, OnDestroy {
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

  selectcedSeats: Seat[] = [];

  seatClicked(): void {
    if (!this.selectcedSeats.some((seat: Seat) => seat.seatId === this.clickedSeatData.seatId)) {
      this.selectcedSeats.unshift(this.clickedSeatData);
    }
    else {
      this.selectcedSeats = this.selectcedSeats.filter((seat: Seat) => seat.seatId !== this.clickedSeatData.seatId);
    }
    console.log(this.selectcedSeats);
  }


  peopleSeatData: People[] = [{
    seatId: '3afd907f-4e98-48e6-b1ec-17a8f99be306',
    name: 'Nick',
    surname: 'Bara',
    idNumber: '34050',
    status: 'Completed',
    payoutCompleted: true
  }]

  ticketData: RegisterTicket = {
    trainId: 4,
    date: '2024-10-18T15:34:38.647Z',
    email: 'niko@gamil.com',
    phoneNumber: '+995577899422',
    people: this.peopleSeatData
  }

  createReservationObject(): RegisterTicket {
    let seatsToRegister: People[] = [];

    for (let i = 0; i < this.selectcedSeats.length; i++) {
      let seat: People = {
        seatId: this.selectcedSeats[i].seatId,
        name: JSON.parse(localStorage.getItem('userData') ?? '').firstName,
        surname: JSON.parse(localStorage.getItem('userData') ?? '').lastName,
        idNumber: Math.floor(Math.random() * 10000).toString(),
        status: "Completed",
        payoutCompleted: true
      }

      seatsToRegister.push(seat);
    }

    // const today = new Date();
    // const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    // const formattedDate = today.toLocaleDateString('en-US', options);

    // console.log(formattedDate); // Example output: "Thursday, 7 November"

    let dateNow = new Date().getDate();
    console.log(dateNow);
    let registrableObject: any = {
      trainId: this._queryParams.number,
      date: dateNow,
      email: JSON.parse(localStorage.getItem('userData') ?? '').email,
      phoneNumber: JSON.parse(localStorage.getItem('userData') ?? '').phone,
      people: seatsToRegister
    }

    console.log(registrableObject);

    return registrableObject;
  }

  bookSelectedTickets(): void {
    if (this.selectcedSeats.length != 0 && this.selectcedSeats.length <= 10) {

      Swal.fire({
        title: "Are you sure you want to proceed?",
        text: "Transaction in irreversable and is not 100% refundable",
        icon: "question",
        showConfirmButton: true,
        confirmButtonText: "Proceed",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        preConfirm: () => {
          console.log(this.createReservationObject());
          this.swaggerAPIService.postTicket(this.createReservationObject()).subscribe(
            (response) => {
              console.log(response);
            }
          )
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.activatedRoutSubscription.unsubscribe();
    this.getVagonSeatsSubscription.unsubscribe();
  }
}
