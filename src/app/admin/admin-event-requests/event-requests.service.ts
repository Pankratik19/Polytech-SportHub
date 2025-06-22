import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { JoinEvent } from '../../events/joinEvent';

@Injectable({ providedIn: 'root' })
export class EventRequestsService {
  private readonly apiUrl = environment.apiUrl + '/admin/joinEventRequests';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<JoinEvent[]> {
    return this.http.get<JoinEvent[]>(this.apiUrl);
  }

  approve(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/approve`, {});
  }

  decline(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/decline`, {});
  }
}
