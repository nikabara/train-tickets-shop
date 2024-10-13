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

	btnClick() : void {
		this.localStorageService.getVagon(5, 2);
	}
}
