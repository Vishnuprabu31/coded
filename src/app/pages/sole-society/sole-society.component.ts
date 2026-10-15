import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ShoeProduct {
  name: string;
  category: string;
  price: number;
  color: string;
  image: string;
  description: string;
  sizes: number[];
}

interface BagItem {
  product: ShoeProduct;
  size: number;
}

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sole-society.component.html',
  styleUrl: './sole-society.component.scss',
})
export class SoleSocietyComponent {
  readonly categories = ['ALL', 'RUNNERS', 'EVERYDAY', 'LIMITED'];
  readonly sizes = [6, 7, 8, 9, 10, 11];
  activeCategory = 'ALL';
  menuOpen = false;
  bagOpen = false;
  selectedProduct: ShoeProduct | null = null;
  selectedSize: number | null = null;
  readonly products: ShoeProduct[] = [
    { name: 'The Pace Runner', category: 'RUNNERS', price: 148, color: 'Moss / Chalk', image: 'photo-1542291026-7eec264c27ff', description: 'A cushioned everyday runner with a breathable knit upper and a steady, responsive sole.', sizes: this.sizes },
    { name: 'The Everyday One', category: 'EVERYDAY', price: 128, color: 'Bone / Ink', image: 'photo-1600185365483-26d7a4cc7519', description: 'Clean lines, soft lining, and a flexible profile made for all-day city miles.', sizes: this.sizes },
    { name: 'The Terrain Low', category: 'RUNNERS', price: 168, color: 'Clay / Sand', image: 'photo-1495555961986-6d4c1ecb7be3', description: 'A little more grip for the longer way round, with a lightweight reinforced upper.', sizes: this.sizes },
    { name: 'The Studio 01', category: 'LIMITED', price: 188, color: 'Cloud / Silver', image: 'photo-1549298916-b41d501d3772', description: 'A small-run studio silhouette in tonal cloud and silver with considered recycled materials.', sizes: this.sizes },
  ];
  bag: BagItem[] = [];

  get visibleProducts() {
    return this.activeCategory === 'ALL'
      ? this.products
      : this.products.filter((product) => product.category === this.activeCategory);
  }

  openProduct(product: ShoeProduct): void {
    this.selectedProduct = product;
    this.selectedSize = null;
  }

  addToBag(): void {
    if (!this.selectedProduct || this.selectedSize === null) return;
    this.bag = [...this.bag, { product: this.selectedProduct, size: this.selectedSize }];
    this.bagOpen = true;
    this.selectedProduct = null;
  }

  get bagLines(): BagItem[] {
    const unique = new Map<string, BagItem>();
    for (const line of this.bag) unique.set(`${line.product.name}-${line.size}`, line);
    return [...unique.values()];
  }

  quantityFor(line: BagItem): number {
    return this.bag.filter((item) => item.product.name === line.product.name && item.size === line.size).length;
  }

  get bagTotal(): number {
    return this.bag.reduce((total, item) => total + item.product.price, 0);
  }
}
