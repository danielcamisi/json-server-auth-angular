import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto } from './projeto.models';
import { map, switchMap  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private apiUrl = 'http://localhost:3000/projetos';

  constructor(private http: HttpClient) { }

  // Método GET para obter todos os projetos
  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl);
  }

  // Método POST para criar um novo projeto, e mantendo a sequência de ID's

  addProjeto(projeto: Omit<Projeto, 'id'>): Observable<Projeto> {
    return this.getProjetos().pipe(
      map(projetos => {
        const maxId = projetos.length > 0 ? Math.max(...projetos.map(p => p.id)) : 0;
        const novoProjeto: Projeto = { ...projeto, id: maxId + 1 };
        return novoProjeto;
      }),
      switchMap(novoProjeto => this.http.post<Projeto>(this.apiUrl, novoProjeto))
    );
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