import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, RouterOutlet],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
    sideBarToggled: boolean = false;

    toggleSideBar(): void {
        this.sideBarToggled = !this.sideBarToggled;
    }
}
