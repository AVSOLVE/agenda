import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseService } from "./base.service";
import { PreloaderService } from "./preloader.service";
import { ConfigService } from "./config.service";
import { ISelectParams } from "../interfaces/selectParams.interface";
import { IParamsGenericSearchField } from "./params-generic-search-field.interface";
import { ResponseAPI } from "./response-api.model";

@Injectable()
export class GenericSearchFieldService extends BaseService {

  private _hostPath = `${ConfigService.config().host}/api/v1`;

  constructor(
    private _http: HttpClient,
    _preloaderService: PreloaderService) {
      super(_preloaderService);
  }

  listSuggestions(
    path: string,
    params: IParamsGenericSearchField = {}
  ): Observable<ResponseAPI<ISelectParams[]>> {
    const url = `${this._hostPath}/${path}`;
    const valueParams = Object.values(params).map((value) => value);
    const newParams = {};

    Object.keys(params).forEach((key, index) => {
      newParams[key] = valueParams[index];
    });

    return this._http.get<ResponseAPI<ISelectParams[]>>(url, {
      params: newParams
    });
  }
}
