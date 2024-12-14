import {Component, Input} from '@angular/core';
import { Info } from "../../Interfaces/Info"
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.sass'
})
export class InfoComponent {
  @Input() data!: Info;
}
