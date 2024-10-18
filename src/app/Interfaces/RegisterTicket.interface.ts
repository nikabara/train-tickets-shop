import { People } from "./People.interface";

export interface RegisterTicket {
    trainId: number,
    date: string,
    email: string,
    phoneNumber: string,
    people: People[]
}