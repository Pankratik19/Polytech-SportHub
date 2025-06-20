import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './event';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TableResult } from './event-results/table/table-result';
import { JoinEvent } from './joinEvent';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly apiUrl = environment.apiUrl + '/events';

  constructor(private readonly http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getTableResultsByEventId(id: number): Observable<TableResult[]> {
    return this.http.get<TableResult[]>(`${this.apiUrl}/${id}/table-results`);
  }

  submitJoinEventRequest(
    eventId: number,
    requestData: JoinEvent
  ): Observable<JoinEvent> {
    const url = `${this.apiUrl}/${eventId}/joinEvent`;
    return this.http.post<JoinEvent>(url, requestData);
  }
}
