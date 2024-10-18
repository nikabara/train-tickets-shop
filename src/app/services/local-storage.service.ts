import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwaggerAPIService } from '../services/swagger-api.service';
import { response } from 'express';
import { Station } from '../Interfaces/Station.interface';
import { Train } from '../Interfaces/Train.interface';
import { Vagon } from '../Interfaces/Vagon.interface';
import { Departure } from '../Interfaces/Departure.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnDestroy {
  putStationsSubscription: Subscription | null = null;
  putTrainsSubscription: Subscription | null = null;
  putVagonsSubscription: Subscription | null = null;
  putDeparturesSubscription: Subscription | null = null;

  error: string | null = null;

  constructor(private swaggerApiService: SwaggerAPIService) { 
    this.putStationsToLocalStorage();
    this.putTrainsToLocalStorage();
    this.putVagonsToLocalStorage();
    this.putDeparturesToLocalStorage();
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

  private putVagonsToLocalStorage() : void {
    if (!localStorage.getItem('vagons')) {
      this.putVagonsSubscription = this.swaggerApiService.getVagons().subscribe(
        (response) => {
          localStorage.setItem('vagons', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/vagons | ${error}`;
        }
      )
    }
  }

  private putDeparturesToLocalStorage() : void {
    if (!localStorage.getItem('departures')) {
      this.putDeparturesSubscription = this.swaggerApiService.getDepartures().subscribe(
        (response) => {
          localStorage.setItem('departures', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/departures | ${error}`;
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

  public getTrainsByFromTo(from: string, to: string) : Train[] {
    let trains: Train[] = JSON.parse(localStorage.getItem('trains') ?? '')
      .filter((train: Train) => train.from === from && train.to === to);

    console.log(trains);
    return trains;
  }

  public getVagonsByTrainId(trainId: number) : Vagon[] {
    let vagons: Vagon[] = JSON.parse(localStorage.getItem('vagons') ?? '')
      .filter((vagon: Vagon) => vagon.trainId === trainId);

    console.log(vagons);
    return vagons;
  }

  public getVagon(trainId: number, vagonName: string) : Vagon {
    let vagon: Vagon = JSON.parse(localStorage.getItem('vagons') ?? '')
      .filter((_vagon: Vagon) => _vagon.trainId === trainId && _vagon.name === vagonName);

      console.log(vagon)
      return vagon;
  }

  ngOnDestroy() : void {
    if (this.putStationsSubscription) {
      this.putStationsSubscription.unsubscribe();
    }
    if (this.putTrainsSubscription) {
      this.putTrainsSubscription.unsubscribe();
    }
    if (this.putVagonsSubscription) {
      this.putVagonsSubscription.unsubscribe();
    }
    if (this.putDeparturesSubscription){
      this.putDeparturesSubscription.unsubscribe();
    }
  }
}