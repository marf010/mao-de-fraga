import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type ProductType = 'soap' | 'arrangement' | 'candle';

export interface Product {
  id: string;
  type: ProductType;
  name: string;
  image: string;
  description: string;
  size: string;
  images?: string[]; 
  composition: string[];
  benefits: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private soaps = signal<Product[]>([]);
  private arrangements = signal<Product[]>([]);
  private candles = signal<Product[]>([]);

  constructor() {
      this.http.get<Product[]>('/data/soaps.json')
        .subscribe({
          next: data => this.soaps.set(data),
          error: err => console.error('Erro ao carregar soaps.json:', err)
        });

      this.http.get<Product[]>('/data/arranjos.json')
        .subscribe({
          next: data => this.arrangements.set(data),
          error: err => console.error('Erro ao carregar arranjos.json:', err)
        });

      this.http.get<Product[]>('/data/candles.json')
        .subscribe({
          next: data => this.candles.set(data),
          error: err => console.error('Erro ao carregar candles.json:', err)
        });
    }

  getByType(type: ProductType): Product[] {
    switch (type) {
      case 'soap': return this.soaps();
      case 'arrangement': return this.arrangements();
      case 'candle': return this.candles();
    }
  }

  getById(type: ProductType, id: string): Product | undefined {
    return this.getByType(type).find(p => String(p.id) === id);
  }
}