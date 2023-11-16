import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NameValueInterface } from '../../../interfaces/NameValue.interface';
import { Router } from '@angular/router';
import { appService } from 'src/app/services/app.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ServicesInterface } from 'src/app/services/ServicesInterface';
import { StaffInterface } from 'src/app/services/StaffInterface';
import { each } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
})
export class StaffCreateComponent implements OnInit {
  genders: NameValueInterface[] = [];
  services: ServicesInterface[] = [];
  staff: StaffInterface[] = [];
  userForm: FormGroup = new FormGroup({});

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
    { label: '07:00', value: 7 },
    { label: '08:00', value: 8 },
    { label: '09:00', value: 9 },
    { label: '10:00', value: 10 },
    { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    { label: '13:00', value: 13 },
    { label: '14:00', value: 14 },
    { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
    { label: '17:00', value: 17 },
    { label: '18:00', value: 18 },
    { label: '19:00', value: 19 },
  ];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadServices();
    this.load();
    this.setUpForm();
  }

  parseJsonArray(jsonString: string): NameValueInterface[] {
    try {
      const parsedData: NameValueInterface | NameValueInterface[] =
        JSON.parse(jsonString);

      if (Array.isArray(parsedData)) {
        return parsedData;
      } else if (typeof parsedData === 'object' && parsedData !== null) {
        // Handle case where parsedData is an object
        return [parsedData];
      } else {
        throw new Error('Invalid JSON data. Expected an array or object.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  }

  parseServicesObject(jsonString: string): ServicesInterface[] {
    try {
      const parsedData: ServicesInterface | ServicesInterface[] =
        JSON.parse(jsonString);

      if (Array.isArray(parsedData)) {
        return parsedData;
      } else if (typeof parsedData === 'object' && parsedData !== null) {
        // Handle case where parsedData is an object
        return [parsedData];
      } else {
        throw new Error('Invalid JSON data. Expected an array or object.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  }

  getStaffByDayHour(
    day: number,
    hour: number,
    data: StaffInterface[]
  ): StaffInterface[] {
    return data.filter(
      (customer) =>
        parseInt(customer.time) === hour && parseInt(customer.weekday) === day
    );
  }

  getStaffByHour(hour: number, data: StaffInterface[]): StaffInterface[] {
    return data.filter((customer) => parseInt(customer.time) === hour);
  }

  getStaffByDay(day: number, data: StaffInterface[]): StaffInterface[] {
    return data.filter((customer) => parseInt(customer.weekday) === day);
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
    return valueArray.map(
      (value) => this.hours.find((item) => item.value === value)?.label || ''
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

  confirmationDelete(eachStaff: StaffInterface) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este serviço?',
      header: 'Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(eachStaff);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this._messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  load(): void {
    const data = { table: 'staff', searchfield: 'name' };
    this._appService.load(data).subscribe({
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
    const data = { table: 'procedures', searchfield: 'name' };
    this._appService.load(data).subscribe({
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

  delete(eachStaff: StaffInterface): void {
    console.log(eachStaff);

    const table = { table: 'staff' };
    this._appService.delete(table, eachStaff).subscribe({
      next: (res) => {
        this.load();
        this.showToast('success', 'Sucesso!', 'Serviço deletado!');
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
