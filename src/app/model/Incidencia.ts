export interface Incindencias {
    id_incidente: Number;
    id_grupo: Number;
    grupo_desc: String;
    id_estado: Number;
    estado_desc: String;
    resumen: String;
    fecha_creacion: Date;
    fecha_cambio: Date;
    usuario_asignado: String;
    usuario_estado: String;
  }

  export interface RendimientoByGrupo {
    grupo_desc: string;
    cant: number;
  }

  export interface IncidenciasAnual {
    mes_desc: string;
    pendientes: number;
    resueltas: number;
    ingresadas: number;
  }
