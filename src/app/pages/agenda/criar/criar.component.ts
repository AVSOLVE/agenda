import {
  Component,
  OnInit,
  ViewEncapsulation,
  LOCALE_ID,
  Inject,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { appService } from 'src/app/services/app.service';
import { formatDate } from '@angular/common';
import { ServicesInterface } from 'src/app/services/ServicesInterface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CriarComponent implements OnInit {
  hours!: any[];
  clients!: any[];
  services!: ServicesInterface[][];
  userForm: FormGroup = new FormGroup({});
  currentDate = new Date();

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _appService: appService,
    private _messageService: MessageService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit() {
    this.setUpForm();
    this.loadUsers();
    this.loadProcedures();
    this.loadHours();
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  setUpForm(): void {
    this.userForm = this._fb.group({
      id: null,
      name: null,
      service: null,
      date: null,
      hours: null,
    });
  }

  cancel() {
    this._router.navigate(['/agenda']);
  }

  save(): void {
    const data = this.prepareData();
    const table = 'agenda';
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


  prepareData() {
    const date = formatDate(
      this.userForm.value.date,
      'dd/MM/yyyy',
      this.locale
    );
    const data = {
      name: this.userForm.value.name.name,
      service: this.userForm.value.service.name,
      date: date,
      hours: this.userForm.value.hours.name,
    };
    return data;
  }

  loadUsers(): void {
    const table = { table: 'users' };
    const route = 'user';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.clients = res.data;
      },
    });
  }

  loadProcedures(): void {
    const table = { table: 'procedures' };
    const route = 'procedure';
    this._appService.load(route, table).subscribe({
      next: (res) => {
        this.services = res.data;
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
}
