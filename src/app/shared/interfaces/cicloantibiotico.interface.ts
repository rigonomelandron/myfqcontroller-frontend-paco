export interface CicloAntibiotico {
  id?: number;
  paciente: Paciente;
  antibiotico: string;
  esIntravenoso: boolean;
  fechaInicio: Date;
  fechaFin: Date;
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
