export interface Deporte {
  id?: number;
  fecha: Date;
  paciente: Paciente;
  tipo: string;
  calorias: number;
  ppmMedia:number;
  ppmMaxima: number;
  tiempo: number;
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
