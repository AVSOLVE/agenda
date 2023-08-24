import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private url = 'http://demo6515314.mockable.io/api/v1/admin/core/user';

  constructor(private _http: HttpClient) { }

  getProcedures() {
    return this._http.get(this.url);
  }
}
