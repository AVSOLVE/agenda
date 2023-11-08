import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  TableHeaderCheckboxToggleEvent,
  TablePageEvent,
  Table,
} from 'primeng/table';
import { AgendaInterface, appService } from 'src/app/services/app.service';
import { Component, OnInit } from '@angular/core';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  selectedUser!: any;
  agenda: AgendaInterface[] = [];
  cols!: Column[];
  rowData: any;
  toggleEditOnSelection: any;
  toggleDeleteOnSelection: any;
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

  constructor(
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService // private modal: NgbModal
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadClients();
    this.loadProcedures();
    this.loadHours();

    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'procedure', header: 'Procedimento' },
      { field: 'date', header: 'Data' },
      { field: 'hours', header: 'Horario' },
    ];
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
    const table = { table: 'agenda' };
    const route = 'agenda';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.agenda = res.data;
      },
    });
  }

  loadProcedures(): void {
    const table = { table: 'procedures' };
    const route = 'procedure';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.procedures = res.data;
      },
    });
  }

  loadClients(): void {
    const table = { table: 'users' };
    const route = 'user';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.clients = res.data;
      },
    });
  }

  loadHours(): void {
    const table = { table: 'hours' };
    const route = 'hours';
    this._appService.load(route, table).subscribe({
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

  editBooking(booking: AgendaInterface) {
    this.booking = { ...booking };
    console.log(this.booking);

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
