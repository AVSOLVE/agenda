import { AbstractControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { IParamsGenericSearchField } from './params-generic-search-field.interface';
import { SelectParamsInterface } from "./select-params.type";

export interface ConfigGenericSearchFieldInterface {
  data?: SelectParamsInterface | SelectParamsInterface[];
  disabled?: boolean;
  errorMessage?: string;
  label: string;
  multiple?: boolean;
  nameControl: string;
  params?: IParamsGenericSearchField;
  parentForm: FormGroup;
  pathService: string;
  placeholder: string;
  validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
}
