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


  load(table: any = {}, data: any = {}): Observable<any> {
    const path = this.url + `/${table}`;
    return this._http.get(path, { headers: data });
  }

  save(table: any = {}, data: any = {} ): Observable<any> {
    const path = this.url + `/${table}`;
    return this._http.post(path, { data, table });
  }

  update(table: any = {}, data: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + `/${table}`;
    return this._http.put<ClienteInterface[]>(path, { data, table });
  }

  delete(table: any = {}, data: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + `/${data}`;
    return this._http.delete<ClienteInterface[]>(path, { headers: table });
  }
}
