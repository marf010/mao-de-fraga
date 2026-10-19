import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  Product,
  ProductService
} from '../../services/products';


@Component({
  selector: 'app-admin-arrangements',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-arrangements.html',
  styleUrl: './admin-arrangements.scss',
})
export class AdminArrangementsComponent implements OnInit {

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  // =====================================================
  // PRODUTOS
  // =====================================================

  products: Product[] = [];

  // =====================================================
  // NOVO PRODUTO
  // =====================================================

  showForm = false;

  newProduct = this.emptyProduct();

  // =====================================================
  // PRODUTO A EDITAR
  // =====================================================

  editingProduct: Product | null = null;


  // =====================================================
  // CARREGAR PRODUTOS
  // =====================================================

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getProducts('arrangements')
      .subscribe({
        next: (products) => {
          this.products = products;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao carregar produtos:', error);
        }
      });
  }


  // =====================================================
  // AUXILIARES
  // =====================================================

  private emptyProduct() {
    return {
      name: '',
      image: '',
      images: [] as string[],
      description: '',
      size: '',
      composition: '',
      benefits: ''
    };
  }

  /**
   * Comprime uma imagem para JPEG (máx. 1200x1200).
   * Fundo branco, porque o JPEG não suporta transparência
   * (sem isto, PNGs transparentes ficariam com fundo preto).
   */
  private compressImage(file: File): Promise<string> {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = () => {

        const image = new Image();

        image.onload = () => {

          const maxWidth = 1200;
          const maxHeight = 1200;

          let width = image.width;
          let height = image.height;

          // Redimensionar mantendo a proporção
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext('2d');

          if (!context) {
            reject(new Error('Não foi possível criar o canvas.'));
            return;
          }

          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, width, height);

          context.drawImage(image, 0, 0, width, height);

          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };

        image.onerror = () => {
          reject(new Error('Não foi possível processar a imagem.'));
        };

        image.src = reader.result as string;
      };

      reader.onerror = () => {
        reject(new Error('Não foi possível ler a imagem.'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Valida e comprime vários ficheiros, devolvendo apenas as imagens válidas.
   */
  private async processFiles(files: File[]): Promise<string[]> {

    const result: string[] = [];

    for (const file of files) {

      if (!file.type.startsWith('image/')) {
        alert(`"${file.name}" não é uma imagem e foi ignorado.`);
        continue;
      }

      result.push(await this.compressImage(file));
    }

    return result;
  }


  // =====================================================
  // IMAGENS - NOVO ARRANJO (VÁRIAS)
  // =====================================================

  async onNewImagesSelected(event: Event): Promise<void> {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);

    try {

      const images = await this.processFiles(files);

      this.newProduct.images.push(...images);

      // A primeira fotografia é a imagem principal
      this.newProduct.image = this.newProduct.images[0] ?? '';

      this.cdr.detectChanges();

    } catch (error) {

      console.error('Erro ao processar imagens:', error);
      alert('Não foi possível processar as fotografias.');

    } finally {

      // Permitir escolher novamente as mesmas fotografias
      input.value = '';
    }
  }

  removeNewImage(index: number): void {

    this.newProduct.images.splice(index, 1);

    this.newProduct.image = this.newProduct.images[0] ?? '';

    this.cdr.detectChanges();
  }


  // =====================================================
  // IMAGEM - EDITAR ARRANJO (ALTERAR FOTO PRINCIPAL)
  // =====================================================

  async onEditImageSelected(
    event: Event,
    product: Product
  ): Promise<void> {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Por favor seleciona uma imagem.');
      input.value = '';
      return;
    }

    try {

      const image = await this.compressImage(file);

      // Produtos antigos podem só ter "image"
      if (!product.images) {
        product.images = product.image ? [product.image] : [];
      }

      // Substitui apenas a foto principal e mantém as restantes
      if (product.images.length > 0) {
        product.images[0] = image;
      } else {
        product.images.push(image);
      }

      product.image = image;

      this.cdr.detectChanges();

    } catch (error) {

      console.error('Erro ao processar imagem:', error);
      alert('Não foi possível processar a fotografia.');

    } finally {

      input.value = '';
    }
  }


  // =====================================================
  // RESET
  // =====================================================

  resetForm(): void {
    this.newProduct = this.emptyProduct();
    this.showForm = false;
  }


  // =====================================================
  // ADICIONAR PRODUTO
  // =====================================================

  addProduct(): void {

    if (!this.newProduct.name.trim()) {
      alert('Por favor indica o nome do arranjo.');
      return;
    }

    if (!this.newProduct.image) {
      alert('Por favor adiciona uma fotografia do arranjo.');
      return;
    }

    this.productService
      .addProduct('arrangements', this.newProduct)
      .subscribe({

        next: (product) => {

          this.products.push(product);

          this.resetForm();

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error('Erro ao criar produto:', error);

          if (error.status === 413) {
            alert('A fotografia é demasiado grande. Tenta escolher outra fotografia.');
          } else {
            alert('Ocorreu um erro ao guardar o arranjo.');
          }
        }
      });
  }


  // =====================================================
  // EDITAR PRODUTO
  // =====================================================

  editProduct(product: Product): void {

    // Trabalhar numa CÓPIA, para que "Cancelar" descarte as alterações
    this.editingProduct = {
      ...product,
      images: product.images?.length
        ? [...product.images]
        : product.image
          ? [product.image]
          : []
    };
  }


  // =====================================================
  // GUARDAR ALTERAÇÕES
  // =====================================================

  saveEdit(): void {

    if (!this.editingProduct) {
      return;
    }

    if (!this.editingProduct.name.trim()) {
      alert('O arranjo precisa de ter um nome.');
      return;
    }

    if (!this.editingProduct.image) {
      alert('O arranjo precisa de ter uma imagem.');
      return;
    }

    this.productService
      .updateProduct(
        'arrangements',
        this.editingProduct.id,
        this.editingProduct
      )
      .subscribe({

        next: (updatedProduct) => {

          const index = this.products.findIndex(
            product => product.id === updatedProduct.id
          );

          if (index !== -1) {
            this.products[index] = updatedProduct;
          }

          this.editingProduct = null;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error('Erro ao atualizar o arranjo:', error);

          if (error.status === 413) {
            alert('A fotografia é demasiado grande. Tenta escolher uma fotografia mais pequena.');
          } else {
            alert('Ocorreu um erro ao atualizar o arranjo.');
          }
        }
      });
  }


  // =====================================================
  // ELIMINAR PRODUTO
  // =====================================================

  confirmDelete(product: Product): void {

    if (confirm(`Eliminar "${product.name}"?`)) {
      this.deleteProduct(product.id);
    }
  }

  private deleteProduct(id: number): void {

    this.productService
      .deleteProduct('arrangements', id)
      .subscribe({

        next: () => {

          this.products = this.products.filter(
            product => product.id !== id
          );

          // Se estava a ser editado, fechar o formulário
          if (this.editingProduct?.id === id) {
            this.editingProduct = null;
          }

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error('Erro ao eliminar:', error);
          alert('Ocorreu um erro ao eliminar o arranjo.');
        }
      });
  }

}