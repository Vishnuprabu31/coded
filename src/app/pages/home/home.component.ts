import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface PortfolioProject {
  number: string;
  name: string;
  type: string;
  route: string;
  className: string;
  image: string;
  imageAlt: string;
  description: string;
  capabilities: string[];
  technology: string;
}

interface Enquiry {
  name: string;
  email: string;
  projectType: string;
  description: string;
}

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly capabilities = [
    'Website & web application development',
    'Frontend engineering',
    'Backend services & REST APIs',
    'E-commerce & business platforms',
    'Third-party integrations & automation',
    'AI-powered applications',
    'Responsive interfaces & performance',
  ];

  readonly approach = [
    { number: '01', title: 'Discover requirements', detail: 'Understand the people, workflows, constraints, and outcome.' },
    { number: '02', title: 'Plan the solution', detail: 'Choose a practical architecture and a clear path to delivery.' },
    { number: '03', title: 'Build the experience', detail: 'Engineer the interface, features, integrations, and systems.' },
    { number: '04', title: 'Test and refine', detail: 'Validate real use cases, accessibility, responsiveness, and quality.' },
    { number: '05', title: 'Deliver and improve', detail: 'Ship a reliable product and keep evolving it with your business.' },
  ];

  readonly projects: PortfolioProject[] = [
    {
      number: '01',
      name: 'SOLE SOCIETY',
      type: 'E-COMMERCE / FOOTWEAR',
      route: '/projects/sole-society',
      className: 'sole',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Red statement sneaker against a bright studio backdrop',
      description: 'A responsive footwear storefront with a browsable catalogue and a locally managed shopping bag.',
      capabilities: ['Product catalog', 'Category filtering', 'Variants & cart state'],
      technology: 'Angular · TypeScript · SCSS',
    },
    {
      number: '02',
      name: 'BUN THEORY',
      type: 'HOSPITALITY / FOOD',
      route: '/projects/bun-theory',
      className: 'bun',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Juicy double cheeseburger with fresh toppings',
      description: 'A restaurant menu that supports category browsing, configurable items, and an honest demo-order flow.',
      capabilities: ['Menu logic', 'Order configuration', 'Cart & totals'],
      technology: 'Angular · TypeScript · SCSS',
    },
    {
      number: '03',
      name: 'OFFGRID',
      type: 'RETAIL / STREETWEAR',
      route: '/projects/offgrid',
      className: 'offgrid',
      image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Streetwear collection arranged in a minimalist studio',
      description: 'An editorial streetwear shop combining collection filters, size variants, product details, and a lookbook.',
      capabilities: ['Collection browsing', 'Product variants', 'Editorial gallery'],
      technology: 'Angular · TypeScript · SCSS',
    },
    {
      number: '04',
      name: 'AFTERHOURS',
      type: 'CULTURE / MUSIC',
      route: '/projects/afterhours',
      className: 'afterhours',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Crowd lit up at a live music show',
      description: 'A music and events experience with selectable releases, a lightweight browser audio player, and event demos.',
      capabilities: ['Track selection & playback', 'Release browsing', 'Event interactions'],
      technology: 'Angular · TypeScript · Web Audio',
    },
  ];

  enquiry: Enquiry = { name: '', email: '', projectType: '', description: '' };
  enquirySubmitted = false;
  submittedEnquiryName = '';

  submitEnquiry(form: NgForm): void {
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }
    this.enquirySubmitted = true;
    this.submittedEnquiryName = this.enquiry.name;
    form.resetForm({ name: '', email: '', projectType: '', description: '' });
  }
}
