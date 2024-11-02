import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterEvent, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent implements OnInit {
  chosenLanguage: string = "ENG";

  ngOnInit(): void {
    // if (localStorage.getItem('language')) {
    //   this.chosenLanguage = localStorage.getItem('language') ?? 'ENG';

    //   switch (this.chosenLanguage) {
    //     case 'GEO':
    //       document.getElementById('light')?.setAttribute('checked', '');
    //       break;

    //     case 'ENG':
    //       document.getElementById('default')?.setAttribute('checked', '');
    //       break;

    //     default:
    //       break;
    //   }
    // }
  }

  navbarToggled: boolean = false;

  toggleSideBar() : void {
    this.navbarToggled = !this.navbarToggled;
  }

  setLanguageTo(language: string) : void {
    localStorage.setItem('language', language);
    this.chosenLanguage = language;
  }
}
