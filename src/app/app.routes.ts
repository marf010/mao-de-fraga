import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guards';

export const routes: Routes = [

  // =====================================================
  // PÁGINA INICIAL
  // =====================================================

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  // =====================================================
  // PÚBLICO
  // =====================================================

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
    data: {
      type: 'soap'
    }
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
    data: {
      type: 'candle'
    }
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
    data: {
      type: 'arrangement'
    }
  },

  // =====================================================
  // LOGIN DO ADMIN
  // =====================================================

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/admin-login/admin-login')
        .then(m => m.AdminLoginComponent)
  },

  // =====================================================
  // ÁREA ADMIN
  // =====================================================

  {
    path: 'admin',
    canActivate: [adminGuard],

    children: [

      // /admin
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin/admin')
            .then(m => m.AdminComponent)
      },

      // /admin/soaps
      {
        path: 'soaps',
        loadComponent: () =>
          import('./pages/admin-soaps/admin-soaps')
            .then(m => m.AdminSoapsComponent)
      },

      // /admin/candles
      {
        path: 'candles',
        loadComponent: () =>
          import('./pages/admin-candles/admin-candles')
            .then(m => m.AdminCandlesComponent)
      },

      // /admin/arrangements
      {
        path: 'arrangements',
        loadComponent: () =>
          import('./pages/admin-arrangements/admin-arrangements')
            .then(m => m.AdminArrangementsComponent)
      }

    ]
  }

];