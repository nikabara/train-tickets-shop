import { Timestamp } from '@angular/fire/firestore';

export interface Info {
  id: string;
  info: {
    description: string;
    title: string;
    imageUrl: string;
    occured: Timestamp; // Firestore Timestamp type
    estimatedRenewal: Timestamp; // Firestore Timestamp type
  };
}
