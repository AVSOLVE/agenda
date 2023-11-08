import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NameValueInterface } from '../../../interfaces/NameValue.interface';
import { Router } from '@angular/router';
import { appService } from 'src/app/services/app.service';
import { MessageService } from 'primeng/api';
import { ServicesInterface } from 'src/app/services/ServicesInterface';

interface StaffInterface {
  id: number;
  name: string;
  services: string;
  weekday: number;
  time: number[];
}

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
})
export class StaffCreateComponent implements OnInit {
  genders!: NameValueInterface[];
  services!: ServicesInterface[];
  staff!: StaffInterface[];
  userForm: FormGroup = new FormGroup({});
  aux: any[] = [];
  weekdays = [
    { label: 'Domingo', value: 1 },
    { label: 'Segunda-feira', value: 2 },
    { label: 'Terça-feira', value: 3 },
    { label: 'Quarta-feira', value: 4 },
    { label: 'Quinta-feira', value: 5 },
    { label: 'Sexta-feira', value: 6 },
    { label: 'Sábado', value: 7 },
  ];
  hours = [
    { label: '7am', value: 7 },
    { label: '8am', value: 8 },
    { label: '9am', value: 9 },
    { label: '10am', value: 10 },
    { label: '11am', value: 11 },
    { label: '12pm', value: 12 },
    { label: '1pm', value: 13 },
    { label: '2pm', value: 14 },
    { label: '3pm', value: 15 },
    { label: '4pm', value: 16 },
    { label: '5pm', value: 17 },
    { label: '6pm', value: 18 },
    { label: '7pm', value: 19 },
  ];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadServices();
    this.loadStaff();
    this.setUpForm();
  }

  setUpForm(): void {
    this.userForm = this._fb.group({
      id: null,
      name: null,
      services: [null],
      weekday: null,
      time: [null],
    });
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  getLabelsFromValues(valueArray: number[]): string[] {

    const labels: string[] = [];

    valueArray.forEach(value => {
      const hour = this.hours.find(item => item.value === value);
      if (hour) {
        labels.push(hour.label);
      }
    });

    console.log(valueArray, labels);
    return labels;
  }

  getWeekdayLabel(weekday: number): string {
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return weekdays[weekday];
  }

  loadStaff(): void {
    const table = { table: 'staff' };
    const route = 'staff';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.staff = res.data;
        this.showToast('success', 'Colaboradores carregados com successo!', res.message);
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
      },
    });
  }

  loadServices(): void {
    const table = { table: 'procedures' };
    const route = 'procedure';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.services = res.data;
        this.showToast('success', 'Successo!', res.message);
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
      },
    });
  }

  save(): void {
    const data = this.userForm.value;
    data.services = this.userForm
      .get('services')
      ?.value.map((service: { name: any }) => service.name);
    data.weekday = this.userForm.get('weekday')?.value.value;
    data.time = this.userForm
      .get('time')
      ?.getRawValue()
      .map((service: { value: any }) => service.value);

    const table = 'staff';
    this._appService.save(table, data).subscribe({
      next: (res) => {
        this.showToast('success', 'Sucesso!', res.message);
        this.ngOnInit();
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
      },
    });
  }

  cancel() {
    this._router.navigate(['/home']);
  }
}
