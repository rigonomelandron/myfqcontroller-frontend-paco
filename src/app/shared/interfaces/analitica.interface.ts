export interface Analitica {
  id?: number;
  fecha: Date;
  paciente: Paciente;
  tipo: string;
  archivo?: string;
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

