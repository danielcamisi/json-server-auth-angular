import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto } from './projeto.models';
import { map, switchMap  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private apiUrl = 'http://localhost:3001/projetos';

  constructor(private http: HttpClient) { }

  // Método GET para obter todos os projetos
  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiUrl}`);
  }

  // Método POST para criar um novo projeto, e mantendo a sequência de ID's

  addProjeto(projeto: Omit<Projeto, 'id'>): Observable<Projeto> {
    // Envie o projeto sem ID, permitindo que o servidor/banco de dados crie o ID
    return this.http.post<Projeto>(this.apiUrl, projeto);
  }
  // Método DELETE para remover um projeto pelo ID
  deleteProjeto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método PUT para atualizar um projeto pelo ID
  updateProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.apiUrl}/${projeto.id}`, projeto);
  }
}