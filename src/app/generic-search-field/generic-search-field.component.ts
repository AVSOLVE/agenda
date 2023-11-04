import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from "rxjs";
import { Helper } from "../services/helper";
import { AlertService } from "../services";
import { GenericSearchFieldService } from "../services/generic-search-field.service";
import { IParamsGenericSearchField } from "../services/params-generic-search-field.interface";
import { SelectParamsInterface } from "../services/select-params.type";
import { ConfigGenericSearchFieldInterface } from "../services/config-generic-search-field.interface";


@Component({
  selector: 'app-generic-search-field',
  templateUrl: './generic-search-field.component.html',
  styleUrls: ['./generic-search-field.component.scss']
})
export class GenericSearchFieldComponent implements OnInit, OnDestroy, OnChanges {
  @Input() config: ConfigGenericSearchFieldInterface;
  @Output() onSelect = new EventEmitter<SelectParamsInterface>();

  isLoadingSuggestions = false;
  searchForm: FormGroup;
  suggestions: SelectParamsInterface[] = [];
  MAX_NUMBER_FAILED_REQUEST = 3;

  errorRequest = {
    status: false,
    numberAttempts: 0
  };

  // private _sub = new SubSink();

  get inputSearch(): AbstractControl {
    return this.searchForm?.get('search');
  }

  get isInvalidSearch(): boolean {
    return Helper.isInputTouchedAndInvalid(this.inputSearch);
  }

  get numberOfRequestsIsExceeded(): boolean {
    return this.errorRequest.numberAttempts === this.MAX_NUMBER_FAILED_REQUEST;
  }

  get hasErrorRequest(): boolean {
    return this.errorRequest.status && !this.numberOfRequestsIsExceeded;
  }

  constructor(
    private _alertService: AlertService,
    private _fb: FormBuilder,
    private _genericSearchFieldService: GenericSearchFieldService
  ) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleDisabled(changes);
  }

  ngOnInit(): void {
    this.startSearchForm();
    this.populateAutoComplete();
  }

  populateAutoComplete(): void {
    if (!this.config?.data) {
      return;
    }

    if (Array.isArray(this.config.data)) {
      this.successListSuggestions(this.config.data);
    }

    if (!Array.isArray(this.config.data)) {
      this.successListSuggestions([this.config.data]);
    }

    this.inputSearch.setValue(this.config.data);

    if (this.inputSearch.disable) {
      this.inputSearch.enable();
    }
  }

  toggleDisabled(changes: SimpleChanges): void {
    if (!changes.hasOwnProperty('config')) {
      return;
    }
    if (!changes.config.currentValue) {
      return;
    }
    if (!this.searchForm) {
      return;
    }

    const { previousValue, currentValue } = changes.config;

    if (previousValue?.pathService !== currentValue?.pathService) {
      this.searchForm.reset();
    }

    this.config?.disabled ? this.inputSearch.disable() : this.inputSearch.enable();
  }

  startSearchForm(): void {
    const { disabled, validators } = this.config;
    const addValidators = validators ? validators : null;

    this.searchForm = this._fb.group({
      search: [{ value: null, disabled }, addValidators]
    });
    this.config.parentForm.setControl(this.config.nameControl, this.searchForm.get('search'));
  }

  clickLoadSuggestion(): void {
    const search = {
      originalEvent: null,
      query: ''
    };
    this.loadSuggestions(search);
  }

  loadSuggestions(search: IAutocompleteEvent): void {
    if (this.numberOfRequestsIsExceeded) {
      this.suggestions = [];
      return;
    }
    const params = this.generatedParamsLoadSuggestions(search);
    this.isLoadingSuggestions = true;

    this._genericSearchFieldService
      .listSuggestions(this.config.pathService, params)
      .pipe(finalize(() => (this.isLoadingSuggestions = false)))
      .subscribe({
        next: (response) => this.successListSuggestions(response.data),
        error: () => this.handleErroLoadSuggestions()
      });
  }

  generatedParamsLoadSuggestions(search: IAutocompleteEvent): IParamsGenericSearchField {
    const params: IParamsGenericSearchField = {
      query: search.query,
      qtd_itens: 8,
      ...this.config?.params
    };

    if (!params.qtd_itens) {
      delete params.qtd_itens;
    }

    if (!params.query) {
      delete params.query;
    }
    return params;
  }

  successListSuggestions(suggestions: SelectParamsInterface[]): void {
    this.errorRequest.status = false;
    this.errorRequest.numberAttempts = 0;
    this.suggestions = suggestions;
  }

  handleErroLoadSuggestions(): void {
    this.errorRequest.status = true;
    this.errorRequest.numberAttempts++;
    this.suggestions = [];

    if (this.errorRequest.numberAttempts === this.MAX_NUMBER_FAILED_REQUEST) {
      this.showMessageErrorSearch();
    }
  }

  selectItem(item: SelectParamsInterface): void {
    this.onSelect.emit(item);
  }

  showMessageErrorSearch(): void {
    const message = `${
      this.config?.errorMessage || 'Não foi possível obter os items.'
    } Tente novamente em instantes.`;
    this._alertService.toastMessage('error', 'Erro ao realizar a operação.', message);
  }
}
