import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
];
