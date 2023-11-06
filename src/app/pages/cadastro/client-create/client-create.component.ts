import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { appService } from 'src/app/services/app.service';

interface States {
  name: string;
  code: string;
}

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent implements OnInit {
  genders: any[] = [
    { name: 'Masculino', value: 1 },
    { name: 'Feminino', value: 2 },
    { name: 'Outro', value: 3 },
  ];
  userForm: FormGroup = new FormGroup({});
  currentDate = new Date();
  formGroup: FormGroup | undefined;
  value: any;
  brazilianStates: States[] = [
    { name: 'Acre', code: 'AC' },
    { name: 'Alagoas', code: 'AL' },
    { name: 'Amapá', code: 'AP' },
    { name: 'Amazonas', code: 'AM' },
    { name: 'Bahia', code: 'BA' },
    { name: 'Ceará', code: 'CE' },
    { name: 'Distrito Federal', code: 'DF' },
    { name: 'Espírito Santo', code: 'ES' },
    { name: 'Goiás', code: 'GO' },
    { name: 'Maranhão', code: 'MA' },
    { name: 'Mato Grosso', code: 'MT' },
    { name: 'Mato Grosso do Sul', code: 'MS' },
    { name: 'Minas Gerais', code: 'MG' },
    { name: 'Pará', code: 'PA' },
    { name: 'Paraíba', code: 'PB' },
    { name: 'Paraná', code: 'PR' },
    { name: 'Pernambuco', code: 'PE' },
    { name: 'Piauí', code: 'PI' },
    { name: 'Rio de Janeiro', code: 'RJ' },
    { name: 'Rio Grande do Norte', code: 'RN' },
    { name: 'Rio Grande do Sul', code: 'RS' },
    { name: 'Rondônia', code: 'RO' },
    { name: 'Roraima', code: 'RR' },
    { name: 'Santa Catarina', code: 'SC' },
    { name: 'São Paulo', code: 'SP' },
    { name: 'Sergipe', code: 'SE' },
    { name: 'Tocantins', code: 'TO' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this.setUpForm();
  }

  getStateNameByCode(stateCode: string): string | undefined {
    const state = this.brazilianStates.find(
      (state) => state.code === stateCode
    );
    return state ? state.name : undefined;
  }

  convertDateFormat(inputDate: string): string {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(inputDate)) {
      throw new Error('Invalid input date format. Expected format: dd/mm/yyyy');
    }

    const [day, month, year] = inputDate.split('/');
    const convertedDate: string = `${month}/${day}/${year}`;
    return convertedDate;
  }

  calculateAge(): string {
    this.getDataFromCPF();
    const convertedDate = this.convertDateFormat(
      this.userForm.get('dob')?.value
    );
    const today: Date = new Date();
    const birthDate: Date = new Date(convertedDate);
    const ageInMilliseconds: number = today.getTime() - birthDate.getTime();
    const ageInYears: number = new Date(ageInMilliseconds).getFullYear() - 1970;

    return (this.value = ageInYears.toString());
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  clearUserForm(): void {
    this.userForm.reset();
  }

  setUpForm(): void {
    this.userForm = this._fb.group({
      name: null,
      cpf: null,
      cep: null,
      dob: null,
      email: null,
      gender: null,
      phone: null,
      state: null,
      city: null,
      neighborhood: null,
      address: null,
    });
  }

  capitalizeEach(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(' ');
  }

  getDataFromCPF() {
    const data = { cpf: '02350632156', dob: '1990-07-07' };
    this._appService.getDataFromCPF(data).subscribe({
      next: (res) => {
        this.userForm.patchValue({
          name: this.capitalizeEach(res.naturalPerson.name),
        });
      },
    });
  }

  getDataFromCEP() {
    const data = this.userForm.get('cep')?.value;
    this._appService.getDataFromCEP(data).subscribe({
      next: (res) => {
        console.log(res);

        this.userForm.patchValue({
          state: this.getStateNameByCode(res.uf),
          city: res.localidade,
          neighborhood: res.bairro,
          address: res.logradouro,
        });
      },
    });
  }

  save(): void {
    const data = this.userForm.value;
    const table = 'users';
    this._appService.save(table, data).subscribe({
      next: (res) => {
        this.showToast('success', 'Sucesso!', res.message);
        this.clearUserForm();
        this._router.navigate(['/cadastrar']);
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
      },
    });
  }

  cancel() {
    this.clearUserForm();
    this._router.navigate(['/home']);
  }
}
