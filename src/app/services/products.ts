import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  image: string;
  images: string[];
  description: string;
  size: string;
  composition: string;
  benefits: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api';

  getProducts(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/${type}`
    );
  }

  addProduct(
    type: string,
    product: Omit<Product, 'id'>
  ): Observable<Product> {

    return this.http.post<Product>(
      `${this.apiUrl}/${type}`,
      product
    );
  }

  updateProduct(
    type: string,
    id: number,
    product: Partial<Product>
  ): Observable<Product> {

    return this.http.put<Product>(
      `${this.apiUrl}/${type}/${id}`,
      product
    );
  }

  deleteProduct(
    type: string,
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${type}/${id}`
    );
  }
}