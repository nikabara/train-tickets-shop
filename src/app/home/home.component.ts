import { RegisterTicket } from './../Interfaces/RegisterTicket.interface';
import { People } from '../Interfaces/People.interface';
import { SaveDataService } from '../services/save-data.service';
import { SwaggerAPIService } from '../services/swagger-api.service';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [HttpClientModule],
	providers: [SwaggerAPIService, SaveDataService],
	templateUrl: './home.component.html',
	styleUrl: './home.component.sass'
})
export class HomeComponent {
	constructor(private saveDataService: SaveDataService) {}

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
		// this.saveDataService.getTrainsByFromTo('თბილისი', 'ბათუმი');
		// this.saveDataService.getVagonsByTrainId(15);
		// this.saveDataService.getVagon(15, 'II კლასი');
		// this.saveDataService.postTicket(this.ticketData);
		this.saveDataService.confirmTicket("8fc2a0f3-e420-4db1-b8de-03c7b078a820");
	}
}
