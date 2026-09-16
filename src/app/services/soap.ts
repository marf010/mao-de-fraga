import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sabonete {
  id: number;
  name: string;
  image: string;
  description: string;
  labelling: string; //ROTULAGEm 
  composition: string[]; //lista de ingredientes
  benefits: string[]
}

@Injectable({
  providedIn: 'root'
})
export class SaboneteService {

  private soapUrl = 'data/soaps.json';

  constructor(private http: HttpClient) {}

  getSabonetes(): Observable<Sabonete[]> {
    return this.http.get<Sabonete[]>(this.soapUrl);
  }
}