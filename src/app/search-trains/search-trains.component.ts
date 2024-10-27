import { Train } from './../Interfaces/Train.interface';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker-from/datepicker-from.component';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DestinationSelectComponent } from "./destination-select/destination-select.component";
import { SaveDataService } from '../services/save-data.service';
import { Subscription } from 'rxjs';
import { response } from 'express';
import { provideHttpClient } from '@angular/common/http';
import { TrainTicketsComponent } from "../train-tickets/train-tickets.component";

@Component({
  selector: 'app-search-trains',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, DatepickerComponent, DestinationSelectComponent, CommonModule, TrainTicketsComponent],
  templateUrl: './search-trains.component.html',
  styleUrl: './search-trains.component.sass'
})
export class SearchTrainsComponent implements AfterViewInit, OnInit, OnDestroy {
  selectedLanguage: string = localStorage.getItem('language') ?? 'ENG';

  @ViewChildren(DatepickerComponent) datepickers!: QueryList<DatepickerComponent>;
  departureDate: string | null = null;
  returnDate: string | null = null;

  ngAfterViewInit(): void {
    this.datepickers.forEach((datepicker, index) => {
      console.log(`Datepicker ${index}:`, datepicker);
    });
  }

  onSubbmit() : void {
    this.datepickers.forEach((datepicker) => {
      if (datepicker.purpose === "departure") {
        this.departureDate = datepicker.selectedDate;
      }
      else if ( datepicker.purpose === "return") {
        this.returnDate = datepicker.selectedDate;
      }
    })

    alert(`Departure : ${this.departureDate}\nReturn : ${this.returnDate}`)
  }

  fetchTrainsSub: Subscription = new Subscription();

  constructor(private saveDataService: SaveDataService) { }
  
  trains: Train[] = [];

  ngOnInit(): void {
    this.fetchTrainsSub = this.saveDataService.fetchTrainsFromAPI().subscribe(
      (response) => {
        this.trains = response;
        console.log(this.trains)
      },
      (error) => {
        throw new Error(`Failed assigning response to trains ${error}`);
      }
    )
  }


  ngOnDestroy(): void {
    this.fetchTrainsSub.unsubscribe();
  }
}
