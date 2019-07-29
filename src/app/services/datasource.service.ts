import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incindencias, RendimientoByGrupo, IncidenciasAnual } from '../model/Incidencia';
import { Observable } from 'rxjs';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private link: HttpClient) { }

  getOffice(method: string) {

    let actionName: string;

    switch (method) {
      case 'OAP': {
         actionName = 'officeAgilP';
         break;
      }
      case 'OAI': {
        actionName = 'officeAgilI';
         break;
      }
      case 'OAR': {
        actionName = 'officeAgilR';
         break;
      }
      case 'OIP': {
        actionName = 'officeIntranetP';
         break;
      }
      case 'OII': {
        actionName = 'officeIntranetI';
         break;
      }
      case 'OIR': {
        actionName = 'officeIntranetR';
         break;
      }
   }
    const list = this.link.get<[RendimientoByGrupo]>('./assets/json/' + actionName + '.json');
    // const list = this.link.get<RendimientoByGrupo[]>('http://1033pc16:5555/api/incidencias/getagiloffice');
    return list;

  }

  getTime(method: string) {

    let actionName: string;

    switch (method) {
      case 'TA1': {
        actionName = 'timeAgil6m';
        break;
     }
      case 'TA6': {
         actionName = 'timeAgil6m';
         break;
      }
      case 'TIA12': {
        actionName = 'timeAgil12M';
        break;
      } 
      case 'TI1': {
        actionName = 'timeIntranet6m';
         break;
      }
      case 'TI6': {
          actionName = 'timeIntranet6m';
           break;
      }
      case 'TI12': {
          actionName = 'timeIntranet12m';
          break;
      }
   }
   const list = this.link.get<IncidenciasAnual[]>('./assets/json/' + actionName + '.json');
   // const list = this.link.get<IncidenciasAnual[]>('http://1033pc16:5555/api/incidencias/getintranettime6m');
    return list;
  }

  getIncidencia() {
    const url = './assets/json/IncidenciasPendientes.json';
    //const url = 'http://1033pc16:5555/api/incidencias/GetIncidencia/123';
    return this.link.get<Incindencias[]>(url);
  }
  getIncidenciasP() {
    const url = './assets/json/IncidenciasPendientes.json';
    //const url = 'http://1033pc16:5555/api/incidencias/GetIncidenciasPendLast';
    return this.link.get<Incindencias[]>(url);
  }
  getIncidenciasI() {
    const url = './assets/json/IncidenciasIngresadas.json';
    //const url = 'http://1033pc16:5555/api/incidencias/GetIncidenciasIngreLast';

    return this.link.get<Incindencias[]>(url);
  }
  getIncidenciasR() {
    const url = './assets/json/IncidenciasResueltas.json';
    //const url = 'http://1033pc16:5555/api/incidencias/GetIncidenciasResLast';
    return this.link.get<Incindencias[]>(url);
  }

}
