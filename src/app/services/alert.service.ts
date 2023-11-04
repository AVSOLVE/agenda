import { Injectable } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageService } from 'primeng/api';

@Injectable()
export class AlertService {

  constructor(private messageService: MessageService) {}

   /** https://sweetalert2.github.io/
   * icon: The icon of the popup [warning, error, success, info, and question].
   * title: The title of the popup, as HTML.
   * text: A description for the popup. If text and html parameters are provided in the same time, html will be used.
   * more info: https://sweetalert2.github.io/#configuration
   */
  sweetMessage(
    icon = 'success',
    title = 'Titulo',
    text = 'Texto',
    showConfirmButton?,
    confirmButtonText?,
    showCancelButton?,
    cancelButtonText?,
    showDenyButton?,
    denyButtonText?,
    position?,
    timer?,
    footer?
  ): void {
    Swal.fire({
      icon,
      title,
      text,
      showConfirmButton,
      confirmButtonText,
      showCancelButton,
      cancelButtonText,
      showDenyButton,
      denyButtonText,
      position,
      timer,
      footer
    });
  }

  toastMessage(
    severity = 'success',
    summary = 'Titulo',
    detail = 'Descrição',
    life = 5000,
    key?: string
  ): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life,
      key
    });
  }

  successTime(
    title: string,
    text: string = null,
    time: number = 2500
  ): Promise<any> {
    return Swal({
      title,
      text,
      type: 'success',
      timer: time
    });
  }

  sucess(title: string, text: string) {
    return Swal(title, text, 'success');
  }

  infoMessage(title: string, text: string) {
    return Swal(title, text, 'info');
  }

  error(title: string, text: string) {
    Swal(title, text, 'error');
  }

  errorTime(
    title: string,
    text: string = null,
    time: number = 2500
  ): Promise<any> {
    return Swal({
      title,
      text,
      type: 'error',
      timer: time
    });
  }

  swalInit(obj) {
    return Swal(obj);
  }

  prompt(options) {
    const baseOptions = {
      showCancelButton: true,
      confirmButtonText: 'Submit',
      input: 'text'
    };
    return Swal(Object.assign(baseOptions, options));
  }

  confirm(options) {
    const baseOptions = {
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      type: 'warning'
    };
    return Swal(Object.assign(baseOptions, options));
  }

  success(options) {
    const baseOptions = {
      confirmButtonText: 'OK',
      type: 'info'
    };
    return Swal(Object.assign(baseOptions, options));
  }
}
