import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-train-seat',
  standalone: true,
  imports: [],
  templateUrl: './book-train-seat.component.html',
  styleUrl: './book-train-seat.component.sass'
})
export class BookTrainSeatComponent implements OnInit, OnDestroy {
  private activatedRoutSubscription!: Subscription;

  private _queryParams!: any; 

  constructor(private activatedRout: ActivatedRoute) { }

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
  }

  ngOnDestroy(): void {
    this.activatedRoutSubscription.unsubscribe();
  }
}
