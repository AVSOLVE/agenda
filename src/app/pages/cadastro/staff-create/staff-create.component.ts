import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NameValueInterface } from '../../../interfaces/NameValue.interface';
import { Router } from '@angular/router';
import { appService } from 'src/app/services/app.service';
import { MessageService } from 'primeng/api';
import { ServicesInterface } from 'src/app/services/ServicesInterface';
import { StaffInterface } from 'src/app/services/StaffInterface';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
})
export class StaffCreateComponent implements OnInit {
  genders: NameValueInterface[] = [];
  services: ServicesInterface[] = [];
  staff: StaffInterface[] = [];
  userForm: FormGroup = new FormGroup({});
  staf: StaffInterface[] = [
    {
      id: 1,
      name: 'Alexandre Lima Valdivino',
      services:
        '["Drenagem Linfática","AureoloTerapia","Fisioterapia","Gestantes"]',
      weekday: '2',
      time: '12',
    },
    {
      id: 7,
      name: 'Bruno',
      services:
        '[{"id":3,"name":"Gestantes","duration":"60","price":"90"},{"id":1,"name":"Fisioterapia","duration":"50","price":"80"}]',
      weekday: '6',
      time: '12',
    },
    {
      id: 2,
      name: 'Dayanne Lima Valdivino',
      services: '["Gestantes","AureoloTerapia"]',
      weekday: '3',
      time: '8',
    },
    {
      id: 4,
      name: 'juliana',
      services: '["Pediatria","Massoterapia","Limpeza de Pele"]',
      weekday: '5',
      time: '9',
    },
    {
      id: 5,
      name: 'Leozera',
      services: '["Gestantes","Limpeza de Pele"]',
      weekday: '4',
      time: '9',
    },
    {
      id: 3,
      name: 'lucia',
      services: '["Pediatria","Limpeza de Pele","Gestantes"]',
      weekday: '5',
      time: '8',
    },
    {
      id: 6,
      name: 'Teste',
      services:
        '["Fisioterapia","Gestantes","Limpeza de Pele","Drenagem Linfática"]',
      weekday: '2',
      time: '12',
    },
  ];

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
    console.log("by hour: ", this.getStaffByHour(12, this.staf));
    console.log("by day: ", this.getStaffByDay(2, this.staf));
    console.log("by day and then hour: ", this.getStaffByDayHour(2, 12, this.staff));
  }


  getStaffByDayHour(day: number, hour: number, data: StaffInterface[]): StaffInterface[] {
    return data.filter(customer => parseInt(customer.time) === hour && parseInt(customer.weekday) === day);
  }

  getStaffByHour(hour: number, data: StaffInterface[]): StaffInterface[] {
    return data.filter(customer => parseInt(customer.time) === hour);
  }

  getStaffByDay(day: number, data: StaffInterface[]): StaffInterface[] {
    return data.filter(customer => parseInt(customer.weekday) === day);
  }

  setUpForm(): void {
    this.userForm = this._fb.group({
      id: null,
      name: null,
      services: null,
      weekday: null,
      time: null,
    });
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  getLabelsFromValues(valueArray: number[]): string[] {
    return valueArray.map(value =>
      this.hours.find(item => item.value === value)?.label || ''
    );
  }



  getWeekdayLabel(weekday: number): string {
    const weekdays = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    return weekdays[weekday];
  }

  loadStaff(): void {
    const table = { table: 'staff' };
    const route = 'staff';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.staff = res.data;
        this.showToast(
          'success',
          'Colaboradores carregados com successo!',
          res.message
        );
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
    const table = 'staff';
    this._appService.save(table, this.userForm.value).subscribe({
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
