import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ComponentsRoutes } from './components.routing';

import { ResueltosComponent } from './resueltos/resueltos.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { IngresadosComponent } from './ingresados/ingresados.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      ResueltosComponent,
      PendientesComponent,
      IngresadosComponent
  ]
})

export class ComponentsModule {}
