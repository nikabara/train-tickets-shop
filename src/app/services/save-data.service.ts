import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwaggerAPIService } from './swagger-api.service';
import { response } from 'express';
import { Station } from '../Interfaces/Station.interface';
import { Train } from '../Interfaces/Train.interface';
import { Vagon } from '../Interfaces/Vagon.interface';
import { Departure } from '../Interfaces/Departure.interface';
import { RegisterTicket } from '../Interfaces/RegisterTicket.interface';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService implements OnDestroy {
  putStationsSubscription: Subscription | null = null;
  putTrainsSubscription: Subscription | null = null;
  putVagonsSubscription: Subscription | null = null;
  putDeparturesSubscription: Subscription | null = null;
  putTicketsSubscription: Subscription | null = null;
  postTicketSubscription: Subscription | null = null;
  putTrainTicketSubscription: Subscription | null = null;
  checkTicketStatusSubscription: Subscription | null = null;
  confrirmTicketSubscription: Subscription | null = null;
  cancelTicketSubscription: Subscription | null = null;
  getSeatSubscription: Subscription | null = null;
  cancelAllTicketsSubscription: Subscription | null = null;

  error: string | null = null;

  constructor(private swaggerApiService: SwaggerAPIService) { 
    this.putStationsToLocalStorage();
    this.putTrainsToLocalStorage();
    this.putVagonsToLocalStorage();
    this.putDeparturesToLocalStorage();
    this.putTicketsToLocalStorage();
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
    if (!sessionStorage.getItem('trains')) {
      this.putTrainsSubscription = this.swaggerApiService.getTrains().subscribe(
        (response) => {
          sessionStorage.setItem('trains', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/trains | ${error}`;
        }
      )
    }
  }

  private putVagonsToLocalStorage() : void {
    if (!sessionStorage.getItem('vagons')) {
      this.putVagonsSubscription = this.swaggerApiService.getVagons().subscribe(
        (response) => {
          sessionStorage.setItem('vagons', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/vagons | ${error}`;
        }
      )
    }
  }

  private putDeparturesToLocalStorage() : void {
    if (!sessionStorage.getItem('departures')) {
      this.putDeparturesSubscription = this.swaggerApiService.getDepartures().subscribe(
        (response) => {
          sessionStorage.setItem('departures', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/departures | ${error}`;
        }
      )
    }
  }

  private putTicketsToLocalStorage() : void {
    if (!sessionStorage.getItem('tickets')) {
      this.putTicketsSubscription = this.swaggerApiService.getTickets().subscribe(
        (response) => {
          sessionStorage.setItem('tickets', JSON.stringify(response));
        },
        (error) => {
          this.error = `Failed to fetch .../api/tickets | ${error}`
        }
      )
    }
  }

  public postTicket(ticket: RegisterTicket) : void {
    this.putTicketsSubscription = this.swaggerApiService.postTicket(ticket).subscribe(
      (error) => {
        this.error = `Failed to post ticket | ${error}`
      }
    )
  }

  public getStations() : Station[] {
    let stations: Station[] = JSON.parse(localStorage.getItem('stations') ?? '');
    return stations;
  }

  public getTrains() : Train[] {
    let trains: Train[] = JSON.parse(sessionStorage.getItem('trains') ?? '');
    return trains;
  }

  public getTrain(id: number) : Train {
    let train: Train = JSON.parse(sessionStorage.getItem('trains') ?? '')
      .filter((x: Train) => x.id === id);

    return train;
  }

  public getTrainsByFromTo(from: string, to: string) : Train[] {
    let trains: Train[] = JSON.parse(sessionStorage.getItem('trains') ?? '')
      .filter((train: Train) => train.from === from && train.to === to);

    console.log(trains);
    return trains;
  }

  public getVagonsByTrainId(trainId: number) : Vagon[] {
    let vagons: Vagon[] = JSON.parse(sessionStorage.getItem('vagons') ?? '')
      .filter((vagon: Vagon) => vagon.trainId === trainId);

    console.log(vagons);
    return vagons;
  }

  public getVagon(trainId: number, vagonName: string) : Vagon {
    let vagon: Vagon = JSON.parse(sessionStorage.getItem('vagons') ?? '')
      .filter((_vagon: Vagon) => _vagon.trainId === trainId && _vagon.name === vagonName);

      console.log(vagon)
      return vagon;
  }
  
  public getTicketStatus(ticketId: string) : void {
    this.checkTicketStatusSubscription = this.swaggerApiService.CheckTicketStatus(ticketId).subscribe(
      (response) => {
        console.log(response)
        return response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  public getSeat(seatId: string) : void {
    this.getSeatSubscription = this.swaggerApiService.getSeat(seatId).subscribe(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public confirmTicket(ticketId: string) : void {
    this.confrirmTicketSubscription = this.swaggerApiService.ConfirmTicket(ticketId).subscribe(
      (response) => {
        console.log(response.confirmed)
        return response.confirmed;
      },
      (error) => {
        console.log(error);
        return null;
      }
    )
  }

  public cancelTicket(ticketId: string) : void{
    this.cancelTicketSubscription = this.swaggerApiService.CancelTicket(ticketId).subscribe(
      (response) => {
        return response.confirmed;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public cancelTicketAll() : void {
    this.cancelAllTicketsSubscription = this.swaggerApiService.CancelAllTickets().subscribe(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
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
    if (this.putTicketsSubscription) {
      this.putTicketsSubscription.unsubscribe();
    }
    if (this.postTicketSubscription) {
      this.postTicketSubscription.unsubscribe();
    }
    if (this.checkTicketStatusSubscription){
      this.checkTicketStatusSubscription.unsubscribe();
    }
    if (this.getSeatSubscription) {
      this.getSeatSubscription.unsubscribe();
    }
    if (this.confrirmTicketSubscription){
      this.confrirmTicketSubscription.unsubscribe();
    }
    if (this.cancelTicketSubscription) {
      this.cancelTicketSubscription.unsubscribe();
    }
    if (this.cancelAllTicketsSubscription) {
      this.cancelAllTicketsSubscription.unsubscribe();
    }
  }
}