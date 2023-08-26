import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  saveOne(data: any = {}, table: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + '/user';
    return this._http.post<ClienteInterface[]>(path, { data, table });
  }

  deleteOne(data: any = {}, table: any = {}): Observable<ClienteInterface[]> {
    const path = this.url + `/user/${data}`;
    return this._http.delete<ClienteInterface[]>(path, { headers: table });
  }
}
