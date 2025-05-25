import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coach } from './coach';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoachService {
  private readonly apiUrl = environment.apiUrl + '/coaches';

  constructor(private readonly http: HttpClient) {}

  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.apiUrl);
  }
}
