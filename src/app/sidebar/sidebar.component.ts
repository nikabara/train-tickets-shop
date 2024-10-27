import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ThemeOptionsComponent } from './theme-options/theme-options.component';


@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, RouterOutlet, ThemeOptionsComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
    sideBarToggled: boolean = false;

    themeMidpoint: string | null = null;

    getThemeFromLanguageOptions(theme: string) : void {
        this.themeMidpoint = theme;
        this.changeTheme();
    }

    @Output() themeToMain = new EventEmitter<string>();

    changeTheme() {
        console.log("Mid " + this.themeMidpoint + " | " + this.themeToMain.emit(this.themeMidpoint ?? 'light'))
        this.themeToMain.emit(this.themeMidpoint ?? 'light');
    }

    toggleSideBar(): void {
        this.sideBarToggled = !this.sideBarToggled;
    }
}