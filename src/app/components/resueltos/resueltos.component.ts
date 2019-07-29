import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataTable } from 'src/app/tables/datatable.net/datatable.component';
import { DatasourceService } from 'src/app/services/datasource.service';
import * as $$ from 'jQuery';

declare const $: any;

@Component({
  selector: 'app-resueltos',
  templateUrl: './resueltos.component.html'
})

export class ResueltosComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable; // pendientes

  constructor(private data_api: DatasourceService) { }

  ngOnInit() {

 ////////////////// TABLE INCIDENTES CON TABS /////////////////////

 // tabla 1 //

const lstIncidencias = new Array<Array<string>>();
let item = new Array<string>();

  this.data_api.getIncidenciasR().subscribe((data) => {
    data.forEach(function (value, index) {
      item = [];
      item.push(value.id_incidente.toString());
      item.push(value.estado_desc.toString());
      item.push(value.grupo_desc.toString());
      item.push(value.resumen.toString());
      item.push(value.usuario_asignado.toString());
      item.push(value.fecha_cambio.toString());
      lstIncidencias.push(item);
      }
    );

     this.dataTable = {
       headerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario', 'fecha' ],
       footerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario', 'fecha' ],
       dataRows: lstIncidencias
     };
  });
  }


  ngAfterViewInit() {

    ///////////////// FX TABLES /////////////////////
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records"
      }
    });
  
    $('.card .material-datatables label').addClass('form-group');
  
     // Edit record
     $$('#datatables').on('click', function(e) {
  
      $$('#table').toggleClass('col-md-12 col-md-9');
      $$('#timeline').toggleClass('col-md-0 col-md-3');
  
     });
  
       // Edit records
       $$('#close').on('click', function(e) {
  
        $$('#table').addClass('col-md-12');
        $$('#timeline').addClass('d-none');
       });

  }

}
