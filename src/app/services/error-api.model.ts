export class ErrorAPI {
  code?: string;
  message?: string;
  detail?: any;
  description?: string;
  status_code?: number;

  constructor(data?: Partial<ErrorAPI>) {
    Object.assign(this, data);
  }
}
