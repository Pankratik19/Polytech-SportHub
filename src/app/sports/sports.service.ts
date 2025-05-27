import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sport } from './sport';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SportService {
  private readonly apiUrl = environment.apiUrl+"/sports";

  constructor(private readonly http: HttpClient) {}

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiUrl);
  }

  getSportById(id: number): Observable<Sport> {
    return this.http.get<Sport>(`${this.apiUrl}/${id}`);
  }
}