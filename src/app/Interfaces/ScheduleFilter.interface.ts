export interface ScheduleFilter {
  scheduleId: number,
  trainId: number,
  trainName: string,
  trainNumber: number | null,
  departureFrom: string,
  arrivalAt: string,
  departureDate: string | null,
  arrivalDate: string | null
}
