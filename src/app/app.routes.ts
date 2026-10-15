import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((module) => module.HomeComponent),
    title: 'Oak&Code — We build what your business needs',
  },
  {
    path: 'projects/sole-society',
    loadComponent: () =>
      import('./pages/sole-society/sole-society.component').then((module) => module.SoleSocietyComponent),
    title: 'Sole Society — Made to move',
  },
  {
    path: 'projects/bun-theory',
    loadComponent: () =>
      import('./pages/bun-theory/bun-theory.component').then((module) => module.BunTheoryComponent),
    title: 'BUN THEORY — A better kind of burger',
  },
  {
    path: 'projects/offgrid',
    loadComponent: () =>
      import('./pages/offgrid/offgrid.component').then((module) => module.OffgridComponent),
    title: 'OFFGRID — Uniform for the unbothered',
  },
  {
    path: 'projects/afterhours',
    loadComponent: () =>
      import('./pages/afterhours/afterhours.component').then((module) => module.AfterhoursComponent),
    title: 'AFTERHOURS — The night is ours',
  },
  { path: '**', redirectTo: '' },
];
