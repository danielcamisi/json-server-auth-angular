import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Agendamento {
  id?: number;
  titulo: string;
  data: Date;
  hora: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getProjetos() {
    throw new Error('Method not implemented.');
  }
  private jsonURL = 'http://localhost:3000/pub';

  constructor(private http: HttpClient) {}

  getPub(): Observable<any> {
    return this.http.get<any>(this.jsonURL).pipe(
      catchError((error) => {
        console.error('Erro ao buscar dados do JSON:', error);
        return throwError(() => new Error('Erro ao buscar dados do JSON'));
      })
    );
  }

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.jsonURL);
  }

  addAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.jsonURL, agendamento);
  }

  deleteAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonURL}/${id}`);
  }

}