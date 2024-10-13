import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwaggerAPIService } from '../services/swagger-api.service';
import { response } from 'express';
import { Station } from '../Interfaces/Station.interface';
import { Train } from '../Interfaces/Train.interface';
import { Vagon } from '../Interfaces/Vagon.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnDestroy {
  putStationsSubscription: Subscription | null = null;
  putTrainsSubscription: Subscription | null = null;

  error: string | null = null;

  constructor(private swaggerApiService: SwaggerAPIService) { 
    this.putStationsToLocalStorage();
    this.putTrainsToLocalStorage();
  }


  
  private putStationsToLocalStorage() : void {
    if (!localStorage.getItem('stations')) {
      this.putStationsSubscription = this.swaggerApiService.getStations().subscribe(
        (response) => {
          localStorage.setItem('stations', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/stations | ${error}`;
        }
      );
    }
  }

  private putTrainsToLocalStorage() : void {
    console.log("yeah");
    if (!localStorage.getItem('trains')) {
      this.putTrainsSubscription = this.swaggerApiService.getTrains().subscribe(
        (response) => {
          localStorage.setItem('trains', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/trains | ${error}`;
        }
      )
    }
  }

  public getStations() : Station[] {
    let stations: Station[] = JSON.parse(localStorage.getItem('stations') ?? '');
    return stations;
  }

  public getTrains() : Train[] {
    let trains: Train[] = JSON.parse(localStorage.getItem('trains') ?? '');
    return trains;
  }

  public getTrain(id: number) : Train {
    let train: Train = JSON.parse(localStorage.getItem('trains') ?? '')
      .filter((x: Train) => x.id === id);

    return train;
  }


  // This function has error properly returning desired vagon from desired train from localStorage
  public getVagon(trainId: number, vagonId: number) : Vagon {
    let vagon: Vagon = JSON.parse(localStorage.getItem('trains') ?? '')
      .filter((train: Train) => train.id === trainId)
      ?.filter((vagon: Vagon) => vagon.id === vagonId)

    console.log(vagon);
    return vagon;
  }


  ngOnDestroy() : void {
    if (this.putStationsSubscription) {
      this.putStationsSubscription.unsubscribe();
    }
    if (this.putTrainsSubscription) {
      this.putTrainsSubscription.unsubscribe();
    }
  }
}