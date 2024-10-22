import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  selectedLanguage: string = 'ENG';
  selectedCurrency: string = 'USD'
}
