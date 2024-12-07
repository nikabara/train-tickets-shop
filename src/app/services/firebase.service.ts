import { inject, Injectable} from '@angular/core';
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Info } from "../Interfaces/Info"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);
  infoCollection = collection(this.firestore, 'info');

  getInfo(): Observable<Info[]> {
    return collectionData(this.infoCollection, {
      idField: "id"
    }) as Observable<Info[]>;
  }
}
