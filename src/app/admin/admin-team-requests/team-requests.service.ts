import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { JoinTeam } from '../../sport-details/joinTeam';

@Injectable({ providedIn: 'root' })
export class TeamRequestsService {
  private readonly apiUrl = environment.apiUrl + '/admin/joinTeamRequests';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<JoinTeam[]> {
    return this.http.get<JoinTeam[]>(this.apiUrl);
  }

  approve(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/approve`, {});
  }

  decline(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/decline`, {});
  }
}
