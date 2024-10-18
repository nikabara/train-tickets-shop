import { RegisterTicket } from './../Interfaces/RegisterTicket.interface';
import { People } from '../Interfaces/People.interface';
import { LocalStorageService } from './../services/local-storage.service';
import { SwaggerAPIService } from '../services/swagger-api.service';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [HttpClientModule],
	providers: [SwaggerAPIService, LocalStorageService],
	templateUrl: './home.component.html',
	styleUrl: './home.component.sass'
})
export class HomeComponent {
	constructor(private localStorageService: LocalStorageService) {}

	peopleSeatData: People[] = [{
		seatId: '3afd907f-4e98-48e6-b1ec-17a8f99be306',
		name: 'Nick',
		surname: 'Bara',
		idNumber: '34050',
		status: 'Completed',
		payoutCompleted: true
	}]

	ticketData: RegisterTicket = {
		trainId: 4,
		date: '2024-10-18T15:34:38.647Z',
		email: 'niko@gamil.com',
		phoneNumber: '+995577899422',
		people: this.peopleSeatData
	}

	btnClick() : void {
		// this.localStorageService.getTrainsByFromTo('თბილისი', 'ბათუმი');
		// this.localStorageService.getVagonsByTrainId(15);
		// this.localStorageService.getVagon(15, 'II კლასი');
		this.localStorageService.postTicket(this.ticketData);
		console.log(this.ticketData);
	}
}
