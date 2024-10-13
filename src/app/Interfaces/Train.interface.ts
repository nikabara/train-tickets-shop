import { Vagon } from "./Vagon.interface"

export interface Train {
    id: number,
    number: number,
    name: string,
    date: string,
    from: string,
    to: string,
    departure: string,
    arrive: string,
    departureId: number,
    vagons: Vagon[]
}