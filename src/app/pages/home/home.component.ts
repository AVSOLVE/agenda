import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Table, TableHeaderCheckboxToggleEvent, TablePageEvent } from 'primeng/table';
import { AgendaInterface, appService } from "src/app/services/app.service";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  selectedUser!: any;
  agenda: AgendaInterface[] = [];
  cols!: Column[];
  rowData: any;
  toggleEditOnSelection: any;
  toggleDeleteOnSelection: any;
  bookingDialog: boolean = false;
  deleteBookingDialog: boolean = false;
  deleteBookingsDialog: boolean = false;
  bookings: AgendaInterface[] = [];
  booking: any = {};
  selectedBookings: AgendaInterface[] = [];
  submitted: boolean = false;
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  currentDate = new Date();
  hours!: any[];
  clients!: any[];
  procedures!: any[];
  userForm!: FormGroup;
  bokk: any = '22 PM';

  constructor(
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadData()
    this.loadClients();
    this.loadProcedures();
    this.loadHours();

    // this._appService.load().then(data => this.bookings = data);

    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'procedure', header: 'Procedimento' },
      { field: 'date', header: 'Data' },
      { field: 'hours', header: 'Horario' }
    ];
  }
  loadData(): void {
    const table = { table: 'agenda' };
    const route = 'procedure';
    this._appService.load(route, table)
      .subscribe({
        next: (res) => {
          this.agenda = res.data;
        }
      });
  }
  loadProcedures(): void {
    const table = { table: 'procedures' }
    const route = 'procedure';
    this._appService.load(route, table)
      .subscribe({
        next: (res) => {
          this.procedures = res.data;
        }
      });
  }
  loadClients(): void {
    const table = { table: 'clients' }
    const route = 'user';
    this._appService.load(route, table)
      .subscribe({
        next: (res) => {
          this.clients = res.data;
        }
      });
  }

  loadHours(): void {
    const table = { table: 'hours' }
    const route = 'hours';
    this._appService.load(route, table)
      .subscribe({
        next: (res) => {
          this.hours = res.data;
        }
      });
  }


  delete(): void {
    const data = this.selectedUser[0].id;
    const table = { table: 'agenda' };
    this._appService.delete(table, data).subscribe({
      next: (res) => {
        this.selectedUser = null;
        this.loadData();
      }
    });
  }

  create() {
    this._router.navigate(['/criar']);
  }

  update() {
    this._router.navigate(['/editar'])
  }

  onHeaderCheckboxToggle($event: TableHeaderCheckboxToggleEvent) {
    throw new Error('Method not implemented.');
  }

  onPage($event: TablePageEvent) {
    throw new Error('Method not implemented.');
  }

  openNew() {
    this.booking = {};
    this.submitted = false;
    this.bookingDialog = true;
  }

  deleteSelectedBookings() {
    this.deleteBookingsDialog = true;
  }

  editBooking(booking: AgendaInterface) {
    this.booking = { ...booking };
    this.bookingDialog = true;
  }

  deleteBooking(booking: AgendaInterface) {
    this.booking = { ...booking };
    this.deleteBookingDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteBookingsDialog = false;
    this.bookings = this.bookings.filter(val => !this.selectedBookings.includes(val));
    this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'bookings Deleted', life: 3000 });
    this.selectedBookings = [];
  }

  confirmDelete() {
    this.deleteBookingDialog = false;
    this.bookings = this.bookings.filter(val => val.id !== this.booking.id);
    this._appService.load({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.booking = {};
  }

  hideDialog() {
    this.bookingDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.booking.name?.trim()) {
      if (this.booking.id) {
        // @ts-ignore
        this.booking.inventoryStatus = this.booking.inventoryStatus.value ? this.booking.inventoryStatus.value : this.booking.inventoryStatus;
        this.bookings[this.findIndexById(this.booking.id)] = this.booking;
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.booking.id = this.createId();
        this.booking.code = this.createId();
        this.booking.image = 'product-placeholder.svg';
        // @ts-ignore
        this.booking.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        this.bookings.push(this.booking);
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.bookings = [...this.bookings];
      this.bookingDialog = false;
      this.booking = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
