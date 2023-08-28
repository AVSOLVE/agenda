import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

export interface ClienteInterface {
  name: string;
  phone: string;
  email: string;
  gender: string;
  bob: string;
}
export interface AgendaInterface {
  name: string;
  procedure: string;
  date: string;
  time: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  url = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }


  loadAll(data: any = {}): Observable<any> {
    const path = this.url + '/user';
    return this._http.get(path, { headers: data });
  }
// PROCEDIMENTO - LOAD PROCEDIMENTO
  loadProcedure(data: any = {}): Observable<any> {
    const path = this.url + '/procedure';
    return this._http.get(path, { headers: data });
  }

// CLIENTE - NOVO CLIENTE
  newUser(data: any = {}, table: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + '/cadastrarUsuario';
    return this._http.post<ClienteInterface[]>(path, { data, table });
  }

  // PROCEDIMENTO - NOVO PROCEDIMENTO
  newProcedure(data: any = {}, table: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + '/cadastrarProcedimento';
    return this._http.post<ClienteInterface[]>(path, { data, table });
  }

// HOME - NOVO AGENDAMENTO
  newAgenda(data: any = {}, table: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + '/cadastrarAgendamento';
    return this._http.post<ClienteInterface[]>(path, { data, table });
  }

// HOME - EDITAR AGENDAMENTO
  updateAgenda(data: any = {}, table: any = {}, id: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + `/atualizarAgendamento/${id}`;
    return this._http.put<ClienteInterface[]>(path, { data, table });
  }

  deleteOne(data: any = {}, table: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + `/deletar/${data}`;
    return this._http.delete<ClienteInterface[]>(path, { headers: table });
  }
}
