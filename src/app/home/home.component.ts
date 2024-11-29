import { RegisterTicket } from './../Interfaces/RegisterTicket.interface';
import { People } from '../Interfaces/People.interface';
import { SaveDataService } from '../services/save-data.service';
import { SwaggerAPIService } from '../services/swagger-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule\
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core'
import { ExpansionPanelComponent } from "./expansion-panel/expansion-panel.component";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [HttpClientModule, CommonModule, TranslateModule, ExpansionPanelComponent],
	providers: [SwaggerAPIService, SaveDataService],
	templateUrl: './home.component.html',
	styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {
	constructor(private saveDataService: SaveDataService, public auth: AuthService, private translateService: TranslateService) { }

	// peopleSeatData: People[] = [{
	// 	seatId: '3afd907f-4e98-48e6-b1ec-17a8f99be306',
	// 	name: 'Nick',
	// 	surname: 'Bara',
	// 	idNumber: '34050',
	// 	status: 'Completed',
	// 	payoutCompleted: true
	// }]

	// ticketData: RegisterTicket = {
	// 	trainId: 4,
	// 	date: '2024-10-18T15:34:38.647Z',
	// 	email: 'niko@gamil.com',
	// 	phoneNumber: '+995577899422',
	// 	people: this.peopleSeatData
	// }

	changeLanguage() : void {
		if (localStorage.getItem('language') === 'eng') {
			this.translateService.use('geo');
			localStorage.setItem('language', 'geo');
			document.querySelector('.language-change-button')?.classList.add('language-button-image-georgian')
			document.querySelector('.language-change-button')?.classList.remove('language-button-image-english')
		}
		else {
			this.translateService.use('eng');
			localStorage.setItem('language', 'eng');
			document.querySelector('.language-change-button')?.classList.add('language-button-image-english')
			document.querySelector('.language-change-button')?.classList.remove('language-button-image-georgian')
		}
	}

	btnClick(): void {
		// this.saveDataService.getTrainsByFromTo('თბილისი', 'ბათუმი');
		// this.saveDataService.getVagonsByTrainId(15);
		// this.saveDataService.getVagon(15, 'II კლასი');
		// this.saveDataService.postTicket(this.ticketData);
		this.saveDataService.confirmTicket("8fc2a0f3-e420-4db1-b8de-03c7b078a820");
	}

	refreshWebPage() : void {
		window.location.reload();
	}

	// testing email/password --> email: "stepproject@gmail.com", password: "Stepproject123"
	getAccessKey(_email: string, _password: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.auth.signIn({ email: _email, password: _password }).subscribe(
				(response) => {
					sessionStorage.setItem('accessToken', JSON.stringify(response));
					resolve(); // Resolve the promise if the API call is successful
				},
				(error) => {
					console.error(`Error while fetching access token: ${error}`);
					reject(error); // Reject the promise if there is an error
				}
			);
		});
	}

	async swalSignInWindow(): Promise<string[]> {
		const { value: formValues } = await Swal.fire({
			title: "Sign In",
			html: `
			  <input id="swal-input1" class="swal2-input" placeholder="Email" type="email">
			  <input id="swal-input2" class="swal2-input" placeholder="Password" type="password">
			`,
			showConfirmButton: true,
			confirmButtonText: "Sign in",
			focusConfirm: false,
			preConfirm: () => {
				const emailInput = document.getElementById("swal-input1") as HTMLInputElement;
				const passwordInput = document.getElementById("swal-input2") as HTMLInputElement;

				// Validate inputs explicitly
				if (!emailInput.value || !passwordInput.value) {
					Swal.showValidationMessage('Please enter both email and password');
					return;
				}

				// Regular expression for basic email format validation
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailPattern.test(emailInput.value)) {
					Swal.showValidationMessage('Please enter a valid email address');
					return;
				}

				return [emailInput.value, passwordInput.value];
			}
		});

		return formValues;
	}

	public async swalSignIn(): Promise<void> {
		let formValues: string[] = await this.swalSignInWindow();

		// If formValues is undefined (e.g., user closes the modal), skip the rest
		if (!formValues) return;

		console.log(formValues[0], formValues[1]);

		try {
			await this.getAccessKey(formValues[0], formValues[1]);

			this.auth.saveSignIn();

			// After getAccessKey completes, check if the user is authenticated
			if (formValues[0] && formValues[1] && this.auth.isAuthenticated()) {

				Swal.fire({
					title: "We'll send verifiction link to your email",
					text: "Please check your gmail if you are not already verified",
					icon: "success",
					showConfirmButton: true,
					confirmButtonText: "Close",
					preConfirm: () => {
						this.auth.verifyUserEmail(formValues[0]);

						if (!!this.auth.verifyUserEmail(formValues[0])) {
							this.saveUserData();
						}
					}
				})

			} else {
				Swal.fire({
					title: "Sign in was unsuccessful",
					text: "Your email or password is incorrect",
					icon: "error",
					showConfirmButton: true,
					confirmButtonText: "Retry",
					showDenyButton: true,
					denyButtonText: "Close"
				}).then((result) => {
					if (result.isConfirmed) {
						localStorage.removeItem('isAuthed');
						this.swalSignIn();
					}
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Sign in was unsuccessful",
				text: "An error occurred while signing in",
				icon: "error",
				confirmButtonText: "Retry",
				showDenyButton: true,
				denyButtonText: "Close"
			}).then((result) => {
				if (result.isConfirmed) {
					this.swalSignIn();
				}
			});
		}
	}

	saveUserData() : void {
		const token: string = JSON.parse(sessionStorage.getItem('accessToken') ?? '').access_token;

		this.auth.getUser(token).subscribe(
			(response) => {
				localStorage.setItem('userData', JSON.stringify(response));
			},
			(error) => {
				console.log(error);
			}
		)
	}

	ngOnInit(): void {
		// const token: string = JSON.parse(sessionStorage.getItem('accessToken') ?? '').access_token;
		// console.log(token);
		// this.auth.getUser(token).subscribe(
		// 	(response) => {
		// 		console.log(response);
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 	}
		// )

		if (typeof localStorage !== 'undefined' && localStorage.getItem('language') === 'eng') {
			document.querySelector('.language-change-button')?.classList.remove('language-button-image-georgian')
			document.querySelector('.language-change-button')?.classList.add('language-button-image-english')
		}
		else if (typeof localStorage !== 'undefined') {
			document.querySelector('.language-change-button')?.classList.add('language-button-image-georgian')
			document.querySelector('.language-change-button')?.classList.remove('language-button-image-english')
		}
	}

	swalSignOut() : void {
		Swal.fire({
			html: `
			<video class="train-go-video" autoplay loop>
				<source class="heree" src="/train-go-animation.webm" type="video/webm">
		  	</video>
			` ,
			showCancelButton: true,
			cancelButtonText: 'Close',
			cancelButtonColor: "#3581c6",
			showConfirmButton: true,
			confirmButtonText: 'Sign Out',
			confirmButtonColor: '#ea2929',
			imageHeight: "300px"
		}).then((result) => {
			if (result.isConfirmed) {
				this.auth.signOut();
			}
		})
	}	
}
