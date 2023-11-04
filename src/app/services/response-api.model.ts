import { ErrorAPI } from './error-api.model';
import { IPaginationMeta } from "./pagination-meta.interface";

export class ResponseAPI<T> {
  data?: T;
  errors?: ErrorAPI[];
  error?: ErrorAPI;
  meta?: IPaginationMeta;

  constructor(data?: Partial<ResponseAPI<T>>) {
    Object.assign(this, data);
  }
}
