export interface DatosRespiratorios {
  id?: number;
  fecha: Date;
  paciente: Paciente;
  fvc: number;
  fev1: number;
  saturacionBasal: number;
  capacidadAerobica: number;
}

export interface Paciente {
  dni: string;
  nombre: string;
  email: string;
  fechaNacimiento?: Date;
  genero?: string;
  peso?: number;
  altura?: number;
  mutacion1?: string;
  mutacion2?: string;
  idUsuario: number;
}
