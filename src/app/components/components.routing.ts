import { Routes } from '@angular/router';
import { IngresadosComponent } from './ingresados/ingresados.component';
import { ResueltosComponent } from './resueltos/resueltos.component';
import { PendientesComponent } from './pendientes/pendientes.component';


export const ComponentsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'ingresados',
        component: IngresadosComponent,
        data: {depth: 2}
    }]}, {
    path: '',
    children: [ {
      path: 'resueltos',
      component: ResueltosComponent,
      data: {depth: 2}
    }]
    }, {
      path: '',
      children: [ {
        path: 'pendientes',
        component: PendientesComponent,
        data: {depth: 2}
        }]
    }
];
