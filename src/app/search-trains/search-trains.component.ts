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
  ],
  templateUrl: './search-trains.component.html',
  styleUrl: './search-trains.component.sass'
})
export class SearchTrainsComponent implements AfterViewInit, OnInit, OnDestroy {
  selectedLanguage: string = localStorage.getItem('language') ?? 'ENG';

  @ViewChildren(DatepickerComponent) datepickers!: QueryList<DatepickerComponent>;
  departureDate: string | null = null;
  arrivalDate: string | null = null;
  cityFrom!: string;
  cityTo!: string;

  ngAfterViewInit(): void {
    this.datepickers.forEach((datepicker, index) => {
      console.log(`Datepicker ${index}:`, datepicker);
    });
  }

  getCity(city: any, purpose: string) : void {
    if (purpose === "From") {
      this.cityFrom = city.value;
    }
    else if (purpose === "To") {
      this.cityTo = city.value;
    }
  }

  // trainForm!: FormGroup;

  onSubbmit() : void {
    this.datepickers.forEach((datepicker) => {
      if (datepicker.purpose === "departure") {
        this.departureDate = datepicker.selectedDate;
      }
      else if ( datepicker.purpose === "return") {
        this.arrivalDate = datepicker.selectedDate;
      }
    })

    // if (this.trainForm.valid) {
    //   console.log('Form Submitted:', this.trainForm.value);
    // }

    // console.log(this.trainForm.value);
    // alert(`Departure : ${this.departureDate}\nReturn : ${this.returnDate}`)
  }

  shishk() {
    console.log(this.cityFrom, this.cityTo, this.arrivalDate, this.departureDate)
  }

  fetchTrainsSub: Subscription = new Subscription();

  constructor(private saveDataService: SaveDataService, private fb: FormBuilder) { }
  
  trains: Train[] = [];

  private fetchTrains() : void {
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

  ngOnInit(): void {
    this.fetchTrains();

    // this.trainForm = this.fb.group({
    //   from: [this.cityFrom, [Validators.required]],
    //   to: [this.cityTo, [Validators.required]],
    //   departureDate: [this.departureDate, [Validators.required, dateCheckValidator()]],
    //   arrivalDate: [this.arrivalDate, [Validators.required, dateCheckValidator()]]
    // });

    
    // console.log('Form Valid:', this.trainForm.valid);
    // console.log('Form Errors:', this.trainForm.errors);
  }


  ngOnDestroy(): void {
    this.fetchTrainsSub.unsubscribe();
  }
}
