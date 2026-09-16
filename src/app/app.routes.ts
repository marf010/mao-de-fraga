import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/home-page/home-page')
        .then(m => m.HomePage)
  },

  {
    path: 'sabões',
    loadComponent: () =>
      import('./pages/soap-page/soap-page')
        .then(m => m.SoapPage)
  },

  {
    path: 'sabao/:id',
    loadComponent: () =>
      import('./pages/product-detail-component/product-detail-component')
        .then(m => m.ProductDetailComponent),
    data: { type: 'soap' }
  }, 

  {
    path: 'velas',
    loadComponent: () =>
      import('./pages/candle-page/candle-page')
        .then(m => m.CandlePage)
  },

  {
    path: 'vela/:id',
    loadComponent: () =>
      import('./pages/product-detail-component/product-detail-component')
        .then(m => m.ProductDetailComponent),
    data: { type: 'candle' }
  },

  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/about-page/about-page')
        .then(m => m.AboutPage)
  },

  {
    path: 'arranjos',
    loadComponent: () =>
      import('./pages/arrangement-page/arrangement-page')
        .then(m => m.ArrangementPage)
  },

  {
    path: 'arranjo/:id',
    loadComponent: () =>
      import('./pages/product-detail-component/product-detail-component')
        .then(m => m.ProductDetailComponent),
    data: { type: 'arrangement' }
  },

];