import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent implements OnInit {
  chosenLanguage: string = "ENG";

  ngOnInit(): void {
    if (localStorage.getItem('language')) {
      this.chosenLanguage = localStorage.getItem('language') ?? 'ENG';

      switch (this.chosenLanguage) {
        case 'GEO':
          document.getElementById('light')?.setAttribute('checked', '');
          break;

        case 'ENG':
          document.getElementById('default')?.setAttribute('checked', '');
          break;

        default:
          break;
      }
    }
  }

  setLanguageTo(language: string) : void {
    localStorage.setItem('language', language);
    this.chosenLanguage = language;
  }
}
