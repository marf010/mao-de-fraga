import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Vela {
  id: number;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandleService {

  private candleUrl = 'data/candles.json';

  constructor(private http: HttpClient) {}

  getVelas(): Observable<Vela[]> {
    return this.http.get<Vela[]>(this.candleUrl);
  }
}