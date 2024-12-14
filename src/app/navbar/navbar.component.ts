import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterEvent, RouterModule } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, TranslateModule],
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

  toggleNavBar() : void {
    this.navbarToggled = !this.navbarToggled;
  }

  setLanguageTo(language: string) : void {
    localStorage.setItem('language', language);
    this.chosenLanguage = language;
  }
}
