import { Routes } from '@angular/router';
import { SoapPage } from './pages/soap-page/soap-page';

export const routes: Routes = [
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
        path: 'velas',
        loadComponent: () =>
            import('./pages/candle-page/candle-page')
            .then(m => m.CandlePage)
    },

    {
        path: 'sobre',
        loadComponent: () =>
            import('./pages/about-page/about-page')
            .then(m => m.AboutPage)
    }
];
