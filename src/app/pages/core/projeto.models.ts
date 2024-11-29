import { Status } from "../../pages/showed/dashboard/dashboard.component";
export interface Projeto {
  id?: number;
  nome: string;
  descprojeto: string;
  status: string; // Corresponde ao ENUM no banco de dados
}