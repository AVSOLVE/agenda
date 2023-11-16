import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  TableHeaderCheckboxToggleEvent,
  TablePageEvent,
  Table,
} from 'primeng/table';
import { appService } from 'src/app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { AgendaDataInterface } from 'src/app/services/AgendaInterface';

interface Person {
  name: string;
  tasks: Task[];
}

interface Task {
  taskName: string;
  personName: string;
  startTime: number;
  endTime: number;
}

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
})
export class AgendaComponent implements OnInit {
  selectedUser!: any;
  cols!: Column[];
  bookingDialog: boolean = false;
  booking: any = {};
  submitted: boolean = false;
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  currentDate = new Date();
  hours!: any[];
  clients!: any[];
  procedures!: any[];
  userForm!: FormGroup;
  day: any;
  today: any;
  week = 6;
  month: any;
  year: any;
  agenda!: AgendaDataInterface[];
  agendaData: Person[] = [];
  people: Person[] = [
    {
      name: 'John',
      tasks: [
        { startTime: 7, endTime: 9, taskName: 'Task 1', personName: 'John' },
      ],
    },
    {
      name: 'Jane',
      tasks: [
        { startTime: 13, endTime: 17, taskName: 'Task 2', personName: 'Jane' },
      ],
    },
  ];

  headers = ['Time'];

  rows: any = [
    { hour: 7, tasks: [] },
    { hour: 8, tasks: [] },
    { hour: 9, tasks: [] },
    { hour: 10, tasks: [] },
    { hour: 11, tasks: [] },
    { hour: 12, tasks: [] },
    { hour: 13, tasks: [] },
    { hour: 14, tasks: [] },
    { hour: 15, tasks: [] },
    { hour: 16, tasks: [] },
    { hour: 18, tasks: [] },
    { hour: 19, tasks: [] },
  ];

  constructor(
    private _appService: appService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadUsers();
    this.loadProcedures();
    this.loadHours();
    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'procedure', header: 'Procedimento' },
      { field: 'date', header: 'Data' },
      { field: 'hours', header: 'Horario' },
    ];
    this.headers = ['Time'].concat(this.people.map((person) => person.name));

    this.updateRowsWithPersonTasks(this.people);
  }

  getWeekDay(dayIndex: number) {
    const weekdays = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    return weekdays[dayIndex];
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  loadData(): void {
    const data = { table: 'agenda', searchfield: 'name' };
    this._appService.load(data).subscribe({
      next: (res) => {
        this.agenda = res.data.name.name;
        console.log('agendaData: ', this.agenda);
      },
    });

    // res.data.forEach((agenda:any) => {
    //   agenda.tasks.map((task:any) => {
    //     for (let i = 0; i < agenda.tasks.length; i++){
    //       this.agendaData[i].tasks.push({
    //         startTime: JSON.parse(task.startTime),
    //         endTime: JSON.parse(task.endTime),
    //         taskName: JSON.parse(task.taskName),
    //         personName: JSON.parse(task.personName)
    //       });
    //     }
    //   })
    // })
  }

  updateRowsWithPersonTasks(newPerson: Person[]): void {
    newPerson.forEach((person) => {
      person.tasks.forEach((task) => {
        for (let i = task.startTime; i < task.endTime; i++) {
          this.rows[i - 7].tasks.push({ ...task });
        }
      });
    });
  }

  loadProcedures(): void {
    const data = { table: 'procedures', searchfield: 'name' };
    this._appService.load(data).subscribe({
      next: (res) => {
        this.procedures = res.data;
      },
    });
  }

  loadUsers(): void {
    const data = { table: 'users', searchfield: 'name' };
    this._appService.load(data).subscribe({
      next: (res) => {
        this.clients = res.data;
      },
    });
  }

  loadHours(): void {
    const data = { table: 'hours', searchfield: 'label' };
    this._appService.load(data).subscribe({
      next: (res) => {
        this.hours = res.data;
      },
    });
  }

  delete(): void {
    const data = this.selectedUser[0].id;
    const table = { table: 'agenda' };
    this._appService.delete(table, data).subscribe({
      next: (res) => {
        this.selectedUser = null;
        this.loadData();
        this.showToast('success', 'Sucesso!', 'deletado');
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
      },
    });
  }

  onHeaderCheckboxToggle($event: TableHeaderCheckboxToggleEvent) {
    throw new Error('Method not implemented.');
  }

  onPage($event: TablePageEvent) {
    throw new Error('Method not implemented.');
  }

  editBooking(booking: AgendaDataInterface) {
    this.booking = { ...booking };
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
