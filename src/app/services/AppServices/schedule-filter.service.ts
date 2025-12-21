import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ScheduleFilter } from '../../Interfaces/ScheduleFilter.interface';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../Interfaces/common/ServiceResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFilterService {
  private readonly url: string = "http://localhost:5097/api"

  private http: HttpClient = inject(HttpClient);

  FilterSchedules(filterModel: ScheduleFilter): Observable<ServiceResponse<ScheduleFilter[]>> {
    return this.http.post<ServiceResponse<ScheduleFilter[]>>(`${this.url}/ScheduleFilter/filter-schedules`, filterModel);
  }
}
