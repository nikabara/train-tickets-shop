import { CreditCardService } from './../services/AppServices/credit-card.service';
import { JwtService } from './../services/AppServices/JWT/jwt.service';
import { TrainService } from './../services/AppServices/train.service';
import { RegisterTicket } from './../Interfaces/RegisterTicket.interface';
import { SwaggerAPIService } from './../services/swagger-api.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seat } from '../Interfaces/Seat.interface';
import { Vagon } from '../Interfaces/Vagon.interface';
import { SeatComponent } from "./seat/seat.component";
import { CommonModule } from '@angular/common';
import { SelectedTicketInfoComponent } from "./selected-ticket-info/selected-ticket-info.component";
import Swal from 'sweetalert2';
import { People } from '../Interfaces/People.interface';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderService } from '../services/loader.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SeatService } from '../services/AppServices/seat.service';
import { UserService } from '../services/AppServices/user.service';
import { response } from 'express';

@Component({
  selector: 'app-book-train-seat',
  standalone: true,
  imports: [SeatComponent, CommonModule, SelectedTicketInfoComponent, TranslateModule, MatProgressSpinnerModule],
  templateUrl: './book-train-seat.component.html',
  styleUrl: './book-train-seat.component.sass'
})
export class BookTrainSeatComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly trainService: TrainService = inject(TrainService);
  private readonly seatService: SeatService = inject(SeatService);
  private readonly jwtService: JwtService = inject(JwtService);
  private readonly userService: UserService = inject(UserService);
  private readonly creditCardService: CreditCardService = inject(CreditCardService);

  private trainId: number | undefined;
  public train: any;

  _queryParams!: any;

  // vagon!: Vagon[];

  businessClassSeats!: Seat[];
  firstClassSeats!: Seat[];
  secondClassSeats!: Seat[];

  allSeats: any[] = [];

  constructor(
    private swaggerAPIService: SwaggerAPIService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');

      if (idString) {
        let trainId: number = Number.parseInt(idString);
        this.trainId = trainId;

        this.trainService.GetTrain(this.trainId).subscribe({
          next: (trainResponse) => {
            if (trainResponse.isSuccess) {
              this.train = trainResponse.data;
              console.log(this.train)
              this.trainVagons = trainResponse.data.vagons;
              console.log(this.trainVagons);

              for (let i = 0; i < this.trainVagons.length; i++) {
                this.seatService.GetAllVagonSeats(this.trainVagons[i].vagonId).subscribe({
                  next: (seatResponse) => {
                    this.allSeats = [...this.allSeats, ...seatResponse.data];
                    console.log(this.allSeats);
                  }
                })
              }

            }
          }
        })
      }
    })
  }

  trainVagons: any;

  getTotalFunds(): number {
    let sum: number = 0;

    this.selectcedSeats.forEach((seat: any) => {
      sum += seat.seatPrice
    });

    return sum;
  }

  bookSeats(): void {
    let decodedToken: any = this.jwtService.decodeToken(localStorage.getItem('jwt_access_token_user')!);

    let userStringId = decodedToken.nameid;

    let userId = Number.parseInt(userStringId);

    this.userService.GetUser(userId).subscribe({
      next: (userResponse) => {
        if (userResponse.isSuccess && userResponse.data.userBalance >= this.getTotalFunds()) {
          console.log(`${userResponse.data.userBalance} >= ${this.getTotalFunds()}`)

          this.creditCardService.GetUserCreditCards(userId).subscribe({
            next: (creditCardResponse) => {
              if (creditCardResponse.isSuccess) {
                this.selectcedSeats.forEach(seat => {
                  let bookSeatModel: any = {
                    transactionAmount: seat.seatPrice,
                    userId: userId,
                    seatId: seat.seatId,
                    currencyId: 1,
                    creditCardId: creditCardResponse.data[0].creditCardId,
                    trainScheduleId: 12
                  }

                  this.seatService.BookSeat(bookSeatModel).subscribe({
                    next: (response) => {
                      if (response.isSuccess) {
                        Swal.fire({
                          title: "Seats booked succesfully",
                          icon: "success"
                        })
                      }
                    }
                  })
                });
              }
            }
          })
        }
      }
    })
  }


  clickedSeatData!: Seat;

  seatPrice: number = 0;
  seatNumber: string = "";

  getSeatData(data: Seat): void {
    this.clickedSeatData = data;
    this.seatPrice = data.price;
    this.seatNumber = data.number;
  }

  selectcedSeats: any[] = [];

  seatClicked(): void {
    if (!this.selectcedSeats.some((seat: Seat) => seat.seatId === this.clickedSeatData.seatId)) {
      this.selectcedSeats.unshift(this.clickedSeatData);
      console.log(this.clickedSeatData)
    }
    else {
      this.selectcedSeats = this.selectcedSeats.filter((seat: Seat) => seat.seatId !== this.clickedSeatData.seatId);
    }
    console.log(this.selectcedSeats);
  }



  showSuccessWindow() : void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Seat(s) have been booked successfully"
    });
  }

  // bookSelectedTickets(): void {
  //   if (this.selectcedSeats.length != 0 && this.selectcedSeats.length <= 10) {

  //     Swal.fire({
  //       title: "Are you sure you want to proceed?",
  //       text: "Transaction in irreversable and is not 100% refundable",
  //       icon: "question",
  //       showConfirmButton: true,
  //       confirmButtonText: "Proceed",
  //       showCancelButton: true,
  //       cancelButtonText: "Cancel",
  //       preConfirm: () => {
  //         console.log(this.createReservationObject());
  //         this.swaggerAPIService.postTicket(this.createReservationObject()).subscribe(
  //           (response) => {
  //             console.log(response);
  //           }
  //         )
  //         window.location.reload();
  //         sessionStorage.setItem('showSuccessWindow', 'true');
  //       }
  //     })
  //   }
  // }

}
