import { Status } from "../../pages/showed/dashboard/dashboard.component";
export interface Projeto {
    Status: { name: string; key: string; };
    nome: string;
    descprojeto: string;
    status_name: string;
    status_key: string;
    id?: number;
  }