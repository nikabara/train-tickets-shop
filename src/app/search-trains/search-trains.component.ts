import { Component } from '@angular/core';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-trains',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './search-trains.component.html',
  styleUrl: './search-trains.component.sass'
})
export class SearchTrainsComponent {
  selectedLanguage: string = localStorage.getItem('language') ?? 'ENG';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.selectedLanguage.toLocaleLowerCase())
  }

  public switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
