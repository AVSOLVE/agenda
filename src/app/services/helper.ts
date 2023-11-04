import { ComponentFixture } from '@angular/core/testing';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { findAllElClass, findEl } from "./find-el.stub";
import { SelectParamsInterface } from "./select-params.type";

export interface IErrorsApi {
  [key: string]: string[];
}

export interface IErrorApi {
  error: {
    errors: IErrorsApi[];
    error?: {
      description: string;
    };
  };
}

class Helper {
  static loadDropdown(enumerator: any, options: any) {
    Object.values(enumerator).forEach((item) => {
      options.push(item);
    });
  }

  static addControlsToParentForm(parentForm: any, formControls: any): void {
    Object.keys(formControls).forEach((key) => {
      parentForm.setControl(key, formControls[key]);
    });
  }

  static formatTime(date: Date): string {
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  static removeNullAndUndefinedKeys<T>(obj: any): T {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] !== null) {
        newObj[key] = obj[key];
      }
    }
    return newObj as T;
  }

  static lengthValidatorsAndRequired(min: number, max: number): ValidatorFn {
    return Validators.compose([
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.required
    ]);
  }

  static convertTimeStringToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes, seconds);
  }

  static convertDateToTimeString(hora: Date): string {
    return `${hora.getHours()}:${hora.getMinutes()}`;
  }

  // static parseErrors<T extends { [key: string]: any }>(errors: IErrorApi): T {
  //   if (!errors || !errors?.error?.errors || Object.keys(errors).length === 0) {
  //     return {} as T;
  //   }
  //   const parsedErrors: any = {};
  //   Object.keys(errors.error.errors).forEach((key: string) => {
  //     parsedErrors[key] = errors.error.errors[key][0];
  //   });
  //   return parsedErrors;
  // }

  // static isInputTouchedAndInvalid(refInput: AbstractControl): boolean {
  //   const touched = !refInput.pristine || refInput.touched;
  //   return touched && refInput.invalid;
  // }

  static clickElement<T>(fixture: ComponentFixture<T>, element: string, index: number = 0) {
    const elementClass = findAllElClass(fixture, element);
    elementClass[index].nativeElement.click();
    fixture.detectChanges();
  }

  static clickDataIdElement<T>(fixture: ComponentFixture<T>, element: string) {
    const elementClass = findEl(fixture, element);
    elementClass.nativeElement.click();
    fixture.detectChanges();
  }

  static formatHours(hours: string[]): string[] {
    return hours.map((hour) => hour.slice(0, -3));
  }

  static arrayToIdsString(array: SelectParamsInterface[], split: string = ';'): string {
    return array.reduce(
      (accumulator, currentValue) =>
        accumulator ? `${accumulator}${split}${currentValue?.id}` : `${currentValue?.id}`,
      ''
    );
  }

  static removeKeyAndValueFromObject<T, K extends keyof T>(key: K, obj: T): T {
    const { [key]: _, ...rest } = obj;
    return { ...rest } as T & Omit<T, K>;
  }

  static getIdInSelectParams<T>(obj: T): T {
    const newObj: T = obj;

    const hasProperties = (objRef: any): boolean => {
      if (!objRef) {
        return false;
      }
      return Object.getOwnPropertyNames(objRef).length === 3;
    };

    const isTypeSelectParams = (objRef: any) => {
      const checkProperties = 'id' in objRef && 'value' && objRef && 'label' in objRef;
      return checkProperties ? objRef.id : objRef;
    };

    // Object.keys(obj).forEach((key) => {
    //   newObj[key] = hasProperties(newObj[key]) ? isTypeSelectParams(newObj[key]) : newObj[key];
    // });

    return newObj;
  }

  static convertToSelectParams(id: number, label: string): SelectParamsInterface {
    return { id, label, value: id };
  }

  static serializeParams(params: any): string {
    const str = [];
    for (const p in params) {
      if (params.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
      }
    }
    return str.join('&');
  }

  static generateUniqueRandomValue(): string {
    const currentDate = new Date();
    const randomValue = Math.random().toString(36).substring(2, 9);
    return `${currentDate.getTime()}_${randomValue}`;
  }

  // static transformArray(array: any[], propertyName: string): any[] {
  //   if (!array) {
  //     return;
  //   }
  //   return array.map((item) => ({
  //     id: null,
  //     [propertyName]: item.id
  //   }));
  // }

  static getStatusValue(status: string | undefined): number | null | undefined {
    if (status === 'active') {
      return 1;
    } else if (status === 'inactive') {
      return 0;
    } else {
      return status as undefined | null;
    }
  }
}
export { Helper };
