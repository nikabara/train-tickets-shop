import { SwaggerAPIService } from './../services/swagger-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seat } from '../Interfaces/Seat.interface';
import { Vagon } from '../Interfaces/Vagon.interface';

@Component({
  selector: 'app-book-train-seat',
  standalone: true,
  imports: [],
  templateUrl: './book-train-seat.component.html',
  styleUrl: './book-train-seat.component.sass'
})
export class BookTrainSeatComponent implements OnInit, OnDestroy {
  private activatedRoutSubscription!: Subscription;
  private getVagonSeatsSubscription!: Subscription;

  private _queryParams!: any; 

  private vagon!: Vagon[];

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

  private getSeatsByVagonId(_trainId: number) {
    this.getVagonSeatsSubscription = this.swaggerAPIService.getVagons().subscribe(
      (response) => {
        this.vagon = response.filter((x: Vagon) => x.trainId === _trainId);
        console.log(this.vagon);
      },
      (error) => {
        throw new Error(`Error fetching vagon/seat data to book-train-seat component ${error}`);
      }
    )
  }

  ngOnDestroy(): void {
    this.activatedRoutSubscription.unsubscribe();
    this.getVagonSeatsSubscription.unsubscribe();
  }
}
