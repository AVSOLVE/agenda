import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

export interface ClienteInterface {
  name?: string;
  phone?: string;
  email?: string;
  gender?: string;
  bob?: string;
}
export interface AgendaInterface {
  id?: string;
  name?: string;
  procedure?: string;
  date?: string;
  time?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class appService {
  url = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getProductsSmall() {
    return this._http.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as AgendaInterface[])
        .then(data => data);
}

getProducts() {
    return this._http.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as AgendaInterface[])
        .then(data => data);
}

getProductsMixed() {
    return this._http.get<any>('assets/demo/data/products-mixed.json')
        .toPromise()
        .then(res => res.data as AgendaInterface[])
        .then(data => data);
}

getProductsWithOrdersSmall() {
    return this._http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as AgendaInterface[])
        .then(data => data);
}

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
