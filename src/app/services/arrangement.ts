import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

export interface Arranjos{
    id: number;
    name: string;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class ArrangementService {
    private arrangementUrl = 'data/arranjos.json';

    constructor(private http: HttpClient) {}

    getArranjos(): Observable<Arranjos[]> {
        return this.http.get<Arranjos[]>(this.arrangementUrl);
    }
}
