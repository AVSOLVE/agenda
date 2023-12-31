import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClienteInterface {
  name?: string;
  phone?: string;
  email?: string;
  gender?: string;
  bob?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class appService {
  url = 'http://localhost:3000';

  constructor(private _http: HttpClient) {}

  load(data: any = {}): Observable<any> {
    const path = this.url + `/${data.table}`;
    return this._http.get(path, { headers: data });
  }

  getDataFromCPF(data: any = {}): Observable<any> {
    const path = 'https://api.nfse.io/NaturalPeople/Basicinfo/taxNumber' + `/${data.cpf}/${data.dob}`;
    return this._http.get(path, { headers: data });
  }

  getDataFromCEP(data: string): Observable<any> {
    const path = `https://viacep.com.br/ws/${data}/json/`;
    return this._http.get(path);
  }

  save(table: any = {}, data: any = {}): Observable<any> {
    const path = this.url + `/${table}`;
    return this._http.post(path, { data, table });
  }

  update(table: any = {}, data: any = {}): Observable<ClienteInterface> {
    const path = this.url + `/${data.id}`;
    return this._http.put<ClienteInterface>(path, { table, data });
  }

  delete(table: any = {}, data: any = {}): Observable<ClienteInterface> {
    const path = this.url + `/${data.id}`;
    return this._http.delete<ClienteInterface>(path, { headers: table });
  }
}
