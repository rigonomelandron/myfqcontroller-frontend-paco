export interface Tratamiento {
  id?: number;
  paciente: Paciente;
  descripcion: string;
  fecha: Date;
  archivo?: string;
  oral: boolean;
  inhalado: boolean;
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
