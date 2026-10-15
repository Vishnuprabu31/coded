import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Garment {
  name: string;
  category: string;
  price: number;
  image: string;
  color: string;
  description: string;
  sizes: string[];
  label?: string;
}

interface CartItem {
  product: Garment;
  size: string;
}

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './offgrid.component.html',
  styleUrl: './offgrid.component.scss',
})
export class OffgridComponent {
  readonly categories = ['ALL PIECES', 'TOPS', 'LAYERS', 'OBJECTS'];
  activeCategory = 'ALL PIECES';
  menuOpen = false;
  cartOpen = false;
  selectedProduct: Garment | null = null;
  selectedSize = '';
  selectedLookbookImage: string | null = null;
  cart: CartItem[] = [];
  readonly lookbook = [
    { image: 'photo-1529139574466-a303027c1d8b', alt: 'Model in a relaxed streetwear look on a city street' },
    { image: 'photo-1503342217505-b0a15ec3261c', alt: 'Layered everyday fashion in natural light' },
    { image: 'photo-1515886657613-9f3515b0c78f', alt: 'Editorial streetwear silhouette in the city' },
    { image: 'photo-1523398002811-999ca8dec234', alt: 'Streetwear capsule collection and accessories' },
  ];
  readonly products: Garment[] = [
    { name: 'Static Logo Tee', category: 'TOPS', price: 48, image: 'photo-1521572163474-6864f9cf17ab', color: 'Washed black', description: 'A midweight cotton tee with a clean front and a familiar, relaxed fit.', sizes: ['XS', 'S', 'M', 'L', 'XL'], label: 'BEST SELLER' },
    { name: 'No Signal Hoodie', category: 'LAYERS', price: 110, image: 'photo-1556821840-3a63f95609a7', color: 'Ash grey', description: 'Heavy brushed fleece, dropped shoulders, and room for the whole day.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
    { name: 'Off Hours Cap', category: 'OBJECTS', price: 38, image: 'photo-1588850561407-ed78c282e89b', color: 'Forest', description: 'An everyday cotton cap with a curved brim and adjustable closure.', sizes: ['One size'] },
    { name: 'Ghost Cargo', category: 'LAYERS', price: 125, image: 'photo-1515886657613-9f3515b0c78f', color: 'Concrete', description: 'Relaxed utility trousers with considered pockets and an adjustable hem.', sizes: ['28', '30', '32', '34', '36'] },
    { name: 'Offline Longsleeve', category: 'TOPS', price: 64, image: 'photo-1503342217505-b0a15ec3261c', color: 'Bone white', description: 'A soft long-sleeve layer with a straightforward fit and durable seams.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
    { name: 'Field Notes Tote', category: 'OBJECTS', price: 32, image: 'photo-1590874103328-eac38a683ce7', color: 'Natural', description: 'A sturdy canvas carryall for everyday essentials and everything else.', sizes: ['One size'] },
  ];

  get visibleProducts(): Garment[] {
    return this.activeCategory === 'ALL PIECES'
      ? this.products
      : this.products.filter((product) => product.category === this.activeCategory);
  }

  openProduct(product: Garment): void {
    this.selectedProduct = product;
    this.selectedSize = '';
  }

  addToCart(): void {
    if (!this.selectedProduct || !this.selectedSize) return;
    this.cart = [...this.cart, { product: this.selectedProduct, size: this.selectedSize }];
    this.cartOpen = true;
    this.selectedProduct = null;
  }

  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price, 0);
  }
}
