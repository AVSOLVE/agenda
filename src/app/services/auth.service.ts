import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthTokenInterface } from '../interfaces';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { PreloaderService } from './preloader.service';
import { StorageService } from './storage.service';
import { TokenModel } from '../models';

const CLIENT_ID: number = ConfigService.config().client_id;
const SECRET: string = ConfigService.config().token;
const OauthLoginEndPointUrl: any = `${ConfigService.config().host}/api/v1/admin/core/auth/token`;

// @TODO - SELEÇÃO DO CONTEXTO DEVE SER IMPLEMENTADO EM UMA ATIVIDADE FUTURA
// COMO ALTERNATIVA O CONTEXTO ESTÁ SETADO COMO (1)
const FilialContextLoginEndPointUrl = `${ConfigService.config().host}/api/v1/admin/core/filial/getFilialContext/1`;

const KEY_TOKEN = 'token';
const ACCESS_TOKEN = 'access_token';
const USUARIO = 'u';
const MENU = 'm';
const ROTAS = 'r';
const DASHBOARDS = 'db';
const HORARIO_LOGIN = 'h';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  protected params = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    preloaderService: PreloaderService
  ) {
    super(preloaderService);
    this.params = {
      client_id: CLIENT_ID,
      client_secret: SECRET,
      grant_type: 'password'
    };
  }

  getAccessTokenApi(user): Observable<AuthTokenInterface> {
    user.client_id = this.params.client_id;
    user.client_secret = this.params.client_secret;
    user.grant_type = this.params.grant_type;
    this.requestInterceptor();
    return this.http.post<AuthTokenInterface>(OauthLoginEndPointUrl, user).pipe(
      catchError((e: HttpErrorResponse) => {
        this.responseInterceptor();
        return this.handleError(e);
      }),
      map((authToken) => {
        this.responseInterceptor();
        this.setAccessToken(authToken.access_token);
        return authToken;
      })
    );
  }

  getContextUserApi(authToken: AuthTokenInterface): Observable<TokenModel> {
    this.requestInterceptor();
    return this.http.get(FilialContextLoginEndPointUrl).pipe(
      catchError((e: HttpErrorResponse) => {
        this.responseInterceptor();
        return this.handleError(e);
      }),
      map((response) => {
        this.responseInterceptor();
        const authTokenContext = { ...authToken, ...response };
        this.setToken(authTokenContext);
        this.removeAccessToken();
        return new TokenModel().deserialize(response);
      })
    );
  }

  getHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  setToken(token) {
    const expiry = new Date();
    expiry.setSeconds(token.expires_in);
    this.storageService.localStorageDrive().set(KEY_TOKEN, token, expiry);
  }

  isAuthenticated() {
    return !!this.getTokenObj();
  }

  getTokenObj() {
    return this.storageService.localStorageDrive().get(KEY_TOKEN);
  }

  getToken() {
    return this.getTokenObj().access_token;
  }

  getContextUser() {
    return this.getTokenObj().context_user;
  }

  setUsuario(obj) {
    this.setItem(USUARIO, obj);
  }

  getUsuario() {
    return this.getItem(USUARIO);
  }

  setTimeOfUse(horario: Date) {
    this.setItem(HORARIO_LOGIN, btoa(horario.toString()));
  }

  removeTimeOfUse() {
    this.remove('h');
  }

  setMenu(obj) {
    this.setItem(MENU, obj);
  }

  getMenu() {
    return this.getItem(MENU);
  }

  setRotas(obj) {
    this.setItem(ROTAS, obj);
  }

  getRotas() {
    return this.getItem(ROTAS);
  }

  setDashboards(obj) {
    this.setItem(DASHBOARDS, obj);
  }

  getDashBoards() {
    return this.getItem(DASHBOARDS);
  }

  removeDashBoards() {
    this.remove('db');
  }

  getAccessToken(): string | undefined {
    return this.getItem(ACCESS_TOKEN);
  }

  removeAccessToken() {
    this.remove(ACCESS_TOKEN);
  }

  logout() {
    this.removeUser();
    this.removeToken();
    this.removeRotas();
    this.removeMenu();
    this.removeDashBoards();
    this.goToLogin();
    this.removeTimeOfUse();
    this.removeAccessToken();
  }

  removeRotas() {
    this.remove('r');
  }

  removeToken() {
    this.remove(KEY_TOKEN);
  }

  removeUser() {
    this.remove('u');
  }

  removeMenu() {
    this.remove(MENU);
  }

  goToAcessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToDashBoard() {
    this.router.navigate(['/']);
  }

  private setAccessToken(token: string): void {
    this.setItem(ACCESS_TOKEN, token);
  }

  private remove(key) {
    this.storageService.localStorageDrive().remove(key);
  }

  private setItem(key, obj) {
    this.storageService.localStorageDrive().set(key, obj);
  }

  private getItem(key) {
    return this.storageService.localStorageDrive().get(key);
  }
}
