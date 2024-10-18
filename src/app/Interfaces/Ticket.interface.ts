import { Train } from "./Train.interface"
import { Person } from "./Person.interface"

export interface Ticket {
    id: string,
    confirmed: boolean,
    date: string,
    email: string,
    phone: string,
    ticketPrice: number,
    trainId: number,
    persons: Person[],
    train: Train[],
}