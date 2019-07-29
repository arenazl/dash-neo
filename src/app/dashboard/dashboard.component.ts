import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';
import { DatasourceService } from '../services/datasource.service';
import { Incindencias, RendimientoByGrupo, IncidenciasAnual } from '../model/Incidencia';
// import * as Chartist from 'chartist';
import {ChartsComponent} from '../charts/charts.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { fadeAnimation } from './../animations';

declare const Chartist: any;
declare const $: any;

const chartFX = new ChartsComponent();

const md: any = {
  misc: {
      navbar_menu_visible: 0,
      active_collapse: true,
      disabled_collapse_init: 0,
  }
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [fadeAnimation]
})

export class DashboardComponent implements OnInit, AfterViewInit {

  public tableData: TableData; // charts

  private bind_simpleBar: Function;
  private bind_colorBar: Function;

  ////////////////// FX CHARTS /////////////////////

  constructor(private data_api: DatasourceService) { }

  public ngOnInit() {

  function toTitleCase(str) {
      return str.replace(
          /\w\S*/g,
          function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
  }

  this.bind_simpleBar = (data_api: DatasourceService, compNumber: string, methodName: string, dataBar: any) => {

      const lstGrupos = Array<string>();
      const lstCant = new Array<Array<number>>();
      const line = new Array<number>();

      const optionsSimpleBarChart = {

      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      plugins: [
        Chartist.plugins.tooltip({
        })
      ]
      };

      const responsiveOptionsSimpleBarChart: any = [
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any) {
              return value[0];
            }
          }
        }
      ];

      data_api.getOffice(methodName).subscribe((data) => {

        data.forEach(function (value, index) {
            line.push(value.cant);
            lstGrupos.push(toTitleCase(value.grupo_desc));
          }
        );
        lstCant.push(line);

        dataBar = {
          labels: lstGrupos,
          series: lstCant
        };

        const simpleBarChart = new Chartist.Bar('#simpleBarChart' + compNumber, dataBar, optionsSimpleBarChart,
        responsiveOptionsSimpleBarChart).on('draw', function(data) {
            if (data.type === 'bar') {
              data.element.attr({
                style: 'stroke-width: 25px'
              });
            }
        });

        // start animation or the Emails Chart
        chartFX.startAnimationForBarChart(simpleBarChart);

      });
  };

  let dataSimpleBarChart: any;
  let dataSimpleBarChart2: any;

  this.bind_simpleBar(this.data_api, '1', 'OAP', dataSimpleBarChart);
  this.bind_simpleBar(this.data_api, '2', 'OIP', dataSimpleBarChart2);

  this.bind_colorBar = (data_api: DatasourceService, compNumber: string, methodName: string, dataBar: any) => {

    const lstMes = Array<string>();
    const lstMain = new Array<Array<Number>>();

    // charts lineas 3 colores,
    const lstPendientes = new Array<number>();
    const lstResueltos = new Array<number>();
    const lstingresados = new Array<number>();

    let optionsColouredBarsChart: any;

    data_api.getTime(methodName).subscribe((data) => {
      data.forEach(function (value) {
          lstMes.push(value.mes_desc);
          lstPendientes.push(value.pendientes);
          lstResueltos.push(value.resueltas);
          lstingresados.push(value.ingresadas);
        }
      );
      lstMain.push(lstPendientes);
      lstMain.push(lstResueltos);
      lstMain.push(lstingresados);

      dataBar = {
        labels: lstMes,
        series: lstMain
      };

      // console.log(dataBar);

      //  Common Tasks
      optionsColouredBarsChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 10
        }),
        axisY: {
            showGrid: true,
            offset: 40
        },
        axisX: {
            showGrid: false,
        },
        low: 0,
        high: 1200,
        showPoint: true,
        height: '300px',
        plugins: [
          Chartist.plugins.tooltip({
          })
        ]
      };

      const colouredBarsChart = new Chartist.Line('#colouredBarsChart' + compNumber, dataBar,
      optionsColouredBarsChart);

      chartFX.startAnimationForLineChart(colouredBarsChart);

    });

  };

  let dataColorBarChart: any;
  let dataColorBarChart2: any;

  this.bind_colorBar(this.data_api, '1', 'TA6', dataColorBarChart);
  this.bind_colorBar(this.data_api, '2', 'TI6', dataColorBarChart2);

}

  ngAfterViewInit() {

  }

  reloadAGilS12m(evt) {
    evt.preventDefault();
    let dataColorBarChart: any;
    this.bind_colorBar(this.data_api, '1', 'TIA12', dataColorBarChart);
  }

  reloadAGil6m(evt) {
    evt.preventDefault();
    let dataColorBarChart: any;
    this.bind_colorBar(this.data_api, '1', 'TA6', dataColorBarChart);
  }

  reloadAGil1m(evt) {
    evt.preventDefault();
    let dataColorBarChart: any;
    this.bind_colorBar(this.data_api, '1', 'TA1', dataColorBarChart);
  }

  reloadIntra6m(evt) {
    evt.preventDefault();
    let dataColorBarChart: any;
    this.bind_colorBar(this.data_api, '2', 'TI6', dataColorBarChart);
  }

  reloadIntra12m(evt) {
    evt.preventDefault();
    let dataColorBarChart: any;
    this.bind_colorBar(this.data_api, '2', 'TI12', dataColorBarChart);
  }

  reloadIntra1m(evt) {
    evt.preventDefault();
    let dataColorBarChart: any;
    this.bind_colorBar(this.data_api, '2', 'TI1', dataColorBarChart);
  }

  reloadOfficeIntraR(evt) {
    evt.preventDefault();
    let simpleBarChart: any;
    this.bind_simpleBar(this.data_api, '2', 'OIR', simpleBarChart);
  }

  reloadOfficeAgilR(evt) {
    evt.preventDefault();
    let simpleBarChart: any;
    this.bind_simpleBar(this.data_api, '1', 'OAR', simpleBarChart);
  }

}


