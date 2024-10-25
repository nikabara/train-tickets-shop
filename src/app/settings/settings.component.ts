import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  providers: [EventEmitter, Output],
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.sass'
})
export class SettingsComponent implements OnInit {
  chosenLanguage: string = "ENG";
  chosenTheme: string = "light";

  // @Output() dataEmitter = new EventEmitter<string>();

  // sendThemeData(data: string) {
  //   this.dataEmitter.emit(data);
  // }

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

    if (localStorage.getItem('theme')) {
      this.chosenTheme = localStorage.getItem('theme') ?? 'light';

      switch (this.chosenTheme) {
        case 'dark':
          document.getElementById('light-unique')?.setAttribute('checked', '');
          break;
          
        case 'light':
          document.getElementById('light-unique')?.setAttribute('checked', '');
          break;
      }
    }
  }

  public setLanguageTo(language: string) : void {
    localStorage.setItem('language', language);
    this.chosenLanguage = language;
  }

  public setThemeTo(theme: string) : void {
    localStorage.setItem('theme', theme);
    this.chosenTheme = theme;
  }
}
