import { Train } from './../Interfaces/Train.interface';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker-from/datepicker-from.component';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DestinationSelectComponent } from "./destination-select/destination-select.component";
import { SaveDataService } from '../services/save-data.service';
import { Subscription } from 'rxjs';
import { TrainTicketsComponent } from "../train-tickets/train-tickets.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeekDaySelectComponent } from "./week-day-select/week-day-select.component";
import { TrainFilterService } from '../services/AppServices/train-filter.service';
import { TrainService } from '../services/AppServices/train.service';
import { ScheduleFilter } from '../Interfaces/ScheduleFilter.interface';
import { ScheduleFilterService } from '../services/AppServices/schedule-filter.service';

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
    ReactiveFormsModule
],
  templateUrl: './search-trains.component.html',
  styleUrl: './search-trains.component.sass'
})
export class SearchTrainsComponent implements AfterViewInit, OnInit {
  selectedLanguage: string = localStorage.getItem('language') ?? 'ENG';

  private readonly scheduleFilterService: ScheduleFilterService = inject(ScheduleFilterService);

  @ViewChildren(DatepickerComponent) datepickers!: QueryList<DatepickerComponent>;
  departureDay!: string;
  cityFrom!: string;
  cityTo!: string;

  ngAfterViewInit(): void {
    this.datepickers.forEach((datepicker, index) => {
      console.log(`Datepicker ${index}:`, datepicker);
    });
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

  departureDate: string | null | undefined;
  arrivalDate: string | null | undefined;

  onSubbmit() : void {
    this.datepickers.forEach((datepicker) => {
      if (datepicker.purpose === "departure") {
        this.departureDate = datepicker.selectedDate;
      }
      else if ( datepicker.purpose === "return") {
        this.arrivalDate = datepicker.selectedDate;
      }
    })

    this.searchSchedule();
  }


  public filteredSchedules: ScheduleFilter[] = [];

  searchSchedule(){
    if (true) {
      let fitlerModel: any = {
        trainName: "",
        trainNumber: null,
        departureFrom: this.cityFrom,
        arrivalAt: this.cityTo,
        departureDate: this.departureDate == null || this.departureDate == undefined ? null : new Date(this.departureDate).toISOString(),
        arrivalDate: this.arrivalDate == null || this.arrivalDate == undefined ? null : new Date(this.arrivalDate).toISOString()
      }

      this.scheduleFilterService.FilterSchedules(fitlerModel).subscribe({
        next: (response: any) => {
          this.filteredSchedules = []
          this.filteredSchedules = response.data;
          console.log(response);
        },
        error: (message: any) => {
          console.log(message);
        }
      })

      console.log(fitlerModel);
    }
  }






  listenToPlayBack(delaySeconds: number, video: HTMLVideoElement) {
    video.addEventListener('ended', () => {
      setTimeout(() => {
        video.currentTime = 0; // Reset to the beginning
        video.play(); // Play the video again
      }, delaySeconds * 1000); // Convert seconds to milliseconds
    });
  }

  ngOnInit(): void {
    // this.fetchTrains();

    const videoElement = document.querySelector('.train-go-video') as HTMLVideoElement;
    if (videoElement) {
      this.listenToPlayBack(1, videoElement); // Pass 1 second delay
    }
  }
}
