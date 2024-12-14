import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SplitSeatNumberPipe } from '../../pipes/split-seat-number.pipe';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [QRCodeModule, TranslateModule, SplitSeatNumberPipe],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.sass'
})
export class SeatComponent implements OnInit {
  @Input() person!: any;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    console.log(this.person, 'seatInfo');
  }
}
