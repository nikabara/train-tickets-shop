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
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { dateCheckValidator } from '../../validators/datecheck.validator';
import { WeekDaySelectComponent } from "./week-day-select/week-day-select.component";

@Component({
  selector: 'app-search-trains',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    DatepickerComponent,
    DestinationSelectComponent,
    CommonModule,
    TrainTicketsComponent,
    ReactiveFormsModule,
    WeekDaySelectComponent
],
  templateUrl: './search-trains.component.html',
  styleUrl: './search-trains.component.sass'
})
export class SearchTrainsComponent implements AfterViewInit, OnInit, OnDestroy {
  selectedLanguage: string = localStorage.getItem('language') ?? 'ENG';

  constructor(private saveDataService: SaveDataService, private fb: FormBuilder) { }

  @ViewChildren(DatepickerComponent) datepickers!: QueryList<DatepickerComponent>;
  // departureDate: string | null = null;
  // returnDate: string | null = null;
  departureDay!: string; 
  cityFrom!: string;
  cityTo!: string;

  ngAfterViewInit(): void {
    this.datepickers.forEach((datepicker, index) => {
      console.log(`Datepicker ${index}:`, datepicker);
    });
  }

  getDepartureDay(day: string) {
    this.departureDay = day;
  }

  getCity(city: any, purpose: string) : void {
    console.log(city, 'city')
    if (purpose === "From") {
      this.cityFrom = city;
    }
    else if (purpose === "To") {
      this.cityTo = city;
    }
  }

  // trainForm!: FormGroup;

  onSubbmit() : void {
    // this.datepickers.forEach((datepicker) => {
    //   if (datepicker.purpose === "departure") {
    //     this.departureDate = datepicker.selectedDate;
    //   }
    //   else if ( datepicker.purpose === "return") {
    //     this.returnDate = datepicker.selectedDate;
    //   }
    // })
    this.filterTrains(this.cityFrom, this.cityTo, this.departureDay);
    console.log(this.trains, this.filteredTrains);
    this.shishk()
  }

  shishk() {
    // console.log(this.cityFrom, this.cityTo, this.returnDate, this.departureDate)
    console.log(this.cityFrom, this.cityTo, this.departureDay);
  }

  fetchTrainsSub: Subscription = new Subscription();
  
  trains!: Train[];

  filteredTrains: Train[] = [];

  private fetchTrains() : void {
    this.fetchTrainsSub = this.saveDataService.fetchTrainsFromAPI().subscribe(
      (response) => {
        this.trains = response;
        this.filteredTrains = this.trains;
        console.log(this.filteredTrains)
        this.filterTrains(this.cityFrom, this.cityTo, this.departureDay);
        console.log(this.trains)
      },
      (error) => {
        throw new Error(`Failed assigning response to trains ${error}`);
      }
    )
  }

  public filterTrains(fromDestination: string, toDestination: string, departureDay: string) : void {
    this.filteredTrains = this.trains.filter((train: Train) =>
      (train.from === fromDestination) && (train.to === toDestination) && (train.date === departureDay)
    )
    console.log(this.filteredTrains, 'filtered');
  }

  ngOnInit(): void {
    this.fetchTrains();
  }


  ngOnDestroy(): void {
    this.fetchTrainsSub.unsubscribe();
  }
}
