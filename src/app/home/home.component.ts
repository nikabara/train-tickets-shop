import { Subscribable, Subscription } from 'rxjs';
import { SwaggerAPIService } from '../services/swagger-api.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Station } from '../Interfaces/Station.interface';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [HttpClientModule],
	providers: [SwaggerAPIService],
	templateUrl: './home.component.html',
	styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit, OnDestroy {
	public stations : Station[] = [];
	public error : Error | null = null;
	private subscription: Subscription | null = null;
	
	constructor(private swaggerApiService: SwaggerAPIService) {}

	getStations() : void {
		if (!localStorage.getItem('stations')) {
			this.subscription = this.swaggerApiService.getStations().subscribe(
				(response) => {
					this.stations = response;
					localStorage.setItem('stations', JSON.stringify(response))
				},
				(error) => {
					this.error = new Error("Failed to fetch .../api/stations");
				}
			);
		}
		else {
			this.stations = JSON.parse(localStorage.getItem('stations') ?? '[]') as Station[];
			console.log(this.stations);
		}
	}

	ngOnInit() : void {
		this.getStations();
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
