import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LanguageOptionsComponent } from "./language-options/language-options.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, RouterOutlet, LanguageOptionsComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
    sideBarToggled: boolean = false;

    toggleSideBar(): void {
        this.sideBarToggled = !this.sideBarToggled;
    }
}