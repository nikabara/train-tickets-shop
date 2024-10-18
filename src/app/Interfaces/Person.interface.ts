import { Seat } from "./Seat.interface"

export interface Person {
    id: number,
    name: string,
    surname: string,
    idNumber: string,
    payoutCompleted: boolean,
    status: string,
    seats: Seat[],
}