import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable, throwError } from 'rxjs';

import { PreloaderService } from './preloader.service';

export abstract class BaseService {

  protected params = null;
  protected UNPROCESSABLE_ENTITY = 422;
  protected MOVED_PERMANENTLY = 301;

  constructor(private preloaderService: PreloaderService) { }

  getHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  protected requestInterceptor(preloaderType = 'full'): void {
    this.preloaderService.showPreloader(preloaderType);
  }

  protected responseInterceptor(preloaderType = 'full'): void {
    this.preloaderService.hidePreloader(preloaderType);
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === this.UNPROCESSABLE_ENTITY) {
      let msg = '';
      for (const i in error.error.errors) {
        if (error.error.errors.hasOwnProperty(i)) {
          msg += `<b>${i}:</b> ${error.error.errors[i]}<br>`;
        }
      }
      this.infoMessage('Informativo!', msg);
    }

    if (error.status === this.MOVED_PERMANENTLY) {
      this.infoMessage('Informativo!', error.error.error.description);
    }

    if (error.status === 0) {
      this.infoMessage('Alerta', 'Houve uma falha de comunicação, tente novamente mais tarde!');
    }

    return throwError(() => error);
  }

  infoMessage(title: string, text: string): Swal {
    return Swal(title, text, 'info' );
  }
}
