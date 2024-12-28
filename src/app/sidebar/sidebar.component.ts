import { Component, Output, EventEmitter, OnDestroy, OnInit, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ThemeOptionsComponent } from './theme-options/theme-options.component';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core'
import { WindowService } from '../services/window.service';


@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, RouterOutlet, ThemeOptionsComponent, TranslateModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
    sideBarToggled: boolean = false;

    themeMidpoint: string | null = null;

    constructor(private translateService: TranslateService, private windowService: WindowService) { }

    getThemeFromLanguageOptions(theme: string): void {
        this.themeMidpoint = theme;
        this.changeTheme();
    }

    @Output() themeToMain = new EventEmitter<string>();

    changeTheme() {
        console.log("Mid " + this.themeMidpoint + " | " + this.themeToMain.emit(this.themeMidpoint ?? 'light'))
        this.themeToMain.emit(this.themeMidpoint ?? 'light');
    }

    ngOnInit(): void {
        this.checkWindowSize(); // Initial check for window size
    }

    toggleSideBar(): void {
        const window = this.windowService.nativeWindow;
        if (window && window.innerWidth >= 1200) { // Allow toggling only if width is >= 1200px
            this.sideBarToggled = !this.sideBarToggled;
        }
    }

    @HostListener('window:resize', ['$event']) // Listen for window resize
    onResize(event: Event): void {
        this.checkWindowSize();
    }

    private checkWindowSize(): void {
        const window = this.windowService.nativeWindow;
        if (window && window.innerWidth < 1200) {
            this.sideBarToggled = true; // Automatically untoggle if width < 1200px
        }
    }
}