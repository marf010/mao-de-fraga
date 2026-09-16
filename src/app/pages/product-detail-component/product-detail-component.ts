import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, ProductType } from '../../services/product';
import { Navbar } from "../../core/components/navbar/navbar";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  private type = this.route.snapshot.data['type'] as ProductType;
  private id = this.route.snapshot.paramMap.get('id')!;

  product = computed(() => this.productService.getById(this.type, this.id));

  selectedImage = signal<string | null>(null);

  gallery = computed(() => {
    const p = this.product();
    if (!p) return [];
    return p.images?.length ? p.images : [p.image];
  });

  activeImage = computed(() => {
    return this.selectedImage() ?? this.gallery()[0];
  });

  selectImage(img: string) {
    this.selectedImage.set(img);
  }

  categoryLabel = {
    soap: 'Os Nossos Sabões',
    arrangement: 'Os Nossos Arranjos',
    candle: 'As Nossas Velas'
  }[this.type];

  categoryRoute = {
    soap: '/sabões',
    arrangement: '/arranjos',
    candle: '/velas'
  }[this.type];
}