import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from './team';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly apiUrl = environment.apiUrl + '/teams';

  constructor(private readonly http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }
}
