import { Train } from "./Train.interface"

export interface Departure {
    id: number,
    source: string,
    destination: string,
    date: string,
    trains: Train[]
}