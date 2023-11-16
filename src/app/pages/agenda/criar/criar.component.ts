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
      date: null,
      startTime: null,
      endTime: null,
      service: null,
    });
  }

  cancel() {
    this._router.navigate(['/agenda']);
  }

  save(): void {
    const table = 'agenda';
    this._appService.save(table, this.userForm.value).subscribe({
      next: (res) => {
        this.showToast('success', 'Sucesso!', res.message);
        this.userForm.reset();
        this.ngOnInit();
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
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

  loadProcedures(): void {
    const data = { table: 'procedures', searchfield: 'name' };
    this._appService.load(data).subscribe({
      next: (res) => {
        this.services = res.data;
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
}
