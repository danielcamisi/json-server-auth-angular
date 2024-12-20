export interface Projeto {
  id: number;
  nome: string;
  descprojeto: string;
  status: string;
  subtarefas: Subtarefa[];
}

interface Subtarefa {
  titulo: string;
  concluida: boolean;
}