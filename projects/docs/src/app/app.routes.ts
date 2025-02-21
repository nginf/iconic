import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'docs',
    loadComponent: () =>
      import('./pages/doc-page/doc-page.component').then(
        (p) => p.DocPageComponent
      ),
    children: [
      {
        path: 'lucide',
        loadComponent: () =>
          import('./pages/lu-page/lu-page.component').then(
            (l) => l.LuPageComponent
          ),
      },
      {
        path: 'ant-design',
        loadComponent: () =>
          import('./pages/ad-page/ad-page.component').then(
            (l) => l.AdPageComponent
          ),
      },
      {
        path: 'font-awesome',
        loadComponent: () =>
          import('./pages/fa-page/fa-page.component').then(
            (l) => l.FaPageComponent
          ),
      },
      {
        path: 'material-design',
        loadComponent: () =>
          import('./pages/md-page/md-page.component').then(
            (l) => l.MdPageComponent
          ),
      },
      {
        path: 'hero-icons',
        loadComponent: () =>
          import('./pages/hi-page/hi-page.component').then(
            (l) => l.HiPageComponent
          ),
      },
      {
        path: 'introduction',
        loadComponent: () =>
          import('./pages/introduction-page/introduction-page.component').then(
            (p) => p.IntroductionPageComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (p) => p.HomePageComponent
      ),
  },
];
