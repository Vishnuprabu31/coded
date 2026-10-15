import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
}

interface OrderLine {
  item: MenuItem;
  additions: string[];
  price: number;
}

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bun-theory.component.html',
  styleUrl: './bun-theory.component.scss',
})
export class BunTheoryComponent {
  readonly categories = ['EVERYTHING', 'BURGERS', 'SIDES', 'SHAKES'];
  activeCategory = 'EVERYTHING';
  menuOpen = false;
  orderOpen = false;
  orderConfirmed = false;
  selectedItem: MenuItem | null = null;
  selectedAdditions: string[] = [];
  readonly additions = [
    { name: 'Extra cheddar', price: 2 },
    { name: 'Crispy bacon', price: 3 },
    { name: 'Pickled jalapeños', price: 1 },
  ];
  order: OrderLine[] = [];
  readonly menu: MenuItem[] = [
    { name: 'The Theory', description: 'Double smash, American cheese, pickle, house sauce, potato bun.', price: 15, category: 'BURGERS', image: 'photo-1568901346375-23c9450c58cd', tag: 'THE ONE' },
    { name: 'Hot Honey Club', description: 'Crispy chicken, hot honey, slaw, cool ranch.', price: 16, category: 'BURGERS', image: 'photo-1606755962773-d324e0a13086', tag: 'A LITTLE HEAT' },
    { name: 'Big Dill Energy', description: 'Single smash, extra dill pickle, mustard, onion.', price: 13, category: 'BURGERS', image: 'photo-1553979459-d2229ba7433b' },
    { name: 'Crinkle Cuts', description: 'Golden, salty, non-negotiable. Add the special sauce.', price: 6, category: 'SIDES', image: 'photo-1573080496219-bb080dd4f877' },
    { name: 'Soft Serve Situation', description: 'Vanilla soft serve, olive oil, flaky salt.', price: 7, category: 'SHAKES', image: 'photo-1497034825429-c343d7c6a68f', tag: 'SWEET FINISH' },
    { name: 'The Green Thing', description: 'Crunchy little gem, green goddess, crispy shallot.', price: 8, category: 'SIDES', image: 'photo-1512621776951-a57141f2eefd' },
  ];

  get visibleMenu(): MenuItem[] {
    return this.activeCategory === 'EVERYTHING'
      ? this.menu
      : this.menu.filter((item) => item.category === this.activeCategory);
  }

  configureItem(item: MenuItem): void {
    this.selectedItem = item;
    this.selectedAdditions = [];
  }

  toggleAddition(name: string): void {
    this.selectedAdditions = this.selectedAdditions.includes(name)
      ? this.selectedAdditions.filter((addition) => addition !== name)
      : [...this.selectedAdditions, name];
  }

  addConfiguredItem(): void {
    if (!this.selectedItem) return;
    const additionPrice = this.selectedAdditions.reduce(
      (total, name) => total + (this.additions.find((addition) => addition.name === name)?.price ?? 0),
      0,
    );
    this.order = [
      ...this.order,
      {
        item: this.selectedItem,
        additions: [...this.selectedAdditions],
        price: this.selectedItem.price + additionPrice,
      },
    ];
    this.selectedItem = null;
    this.orderConfirmed = false;
    this.orderOpen = true;
  }

  get orderTotal(): number {
    return this.order.reduce((total, line) => total + line.price, 0);
  }

  finishDemoOrder(): void {
    this.orderConfirmed = true;
    this.order = [];
  }
}
