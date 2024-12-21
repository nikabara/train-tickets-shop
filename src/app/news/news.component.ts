import {Component, inject, OnInit} from '@angular/core';
import { InfoComponent } from "./info/info.component";
import { FirebaseService } from "../services/firebase.service";
import { Info } from "../Interfaces/Info";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    InfoComponent, CommonModule, MatProgressSpinnerModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.sass'
})
export class NewsComponent implements OnInit {
  constructor(private infoFbService: FirebaseService, public loaderService: LoaderService) { }

  firebaseInfo!: Info[];

  ngOnInit() : void {
    this.infoFbService.getInfo().subscribe(info => {
      this.firebaseInfo = info.reverse();
      console.log(this.firebaseInfo);
    })

  }
}
