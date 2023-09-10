import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  TableHeaderCheckboxToggleEvent,
  TablePageEvent,
  Table,
} from 'primeng/table';
import { AgendaInterface, appService } from 'src/app/services/app.service';

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

  constructor(
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadClients();
    this.loadProcedures();
    this.loadHours();

    // this._appService.load().then(data => this.bookings = data);

    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'procedure', header: 'Procedimento' },
      { field: 'date', header: 'Data' },
      { field: 'hours', header: 'Horario' },
    ];
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  loadData(): void {
    const table = { table: 'agenda' };
    const route = 'procedure';
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
    this.bookingDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
