import { Seat } from "./Seat.interface"

export interface Vagon {
    id: number,
    trainId: number,
    trainNumber: number,
    name: string,
    seats: Seat[]
}