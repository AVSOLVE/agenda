import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { appService } from 'src/app/services/app.service';

interface ServicesInterface {
  name: string;
  duration: number;
  price: number;
}

@Component({
  selector: 'app-procedure-create',
  templateUrl: './procedure-create.component.html',
  styleUrls: ['./procedure-create.component.css'],
})
export class ProcedureCreateComponent implements OnInit {
  serviceForm: FormGroup = new FormGroup({});
  services: ServicesInterface[] = [];
  buttonOptions = 0;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.setUpForm();
    this.load();

    this.services = [
      {
        name: 'Massage Therapy',
        duration: 60,
        price: 50,
      },
      {
        name: 'Physical Exercise Training',
        duration: 45,
        price: 60,
      },
      {
        name: 'Electrotherapy',
        duration: 30,
        price: 40,
      },
      {
        name: 'Joint Mobilization',
        duration: 40,
        price: 55,
      },
      {
        name: 'Ultrasound Therapy',
        duration: 20,
        price: 35,
      },
    ];
  }

  setUpForm(): void {
    this.serviceForm = this._fb.group({
      id: null,
      name: null,
      duration: null,
      price: null,
    });
  }

  editService(service: ServicesInterface) {
    this.serviceForm.patchValue({ ...service });
    this.buttonOptions = 1;
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  confirmationDelete(service: ServicesInterface) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este serviço?',
      header: 'Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(service);
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

  save(): void {
    const data = this.serviceForm.value;
    const table = 'procedures';


//SAVE SERVICE
if(this.buttonOptions == 0){
  this._appService.save(table, data).subscribe({
    next: (res) => {
      this.showToast('success', 'Successo!', res.message);
      this.ngOnInit();
    },
    error: (err) => {
      this.showToast('error', 'Erro!', err.error.message);
    },
  });
}

//UPDATE SERVICE
    if(this.buttonOptions == 1){
      this._appService.update(table, data).subscribe({
        next: (res) => {
          this.showToast('success', 'Successo!', res.message);
          this.buttonOptions = 0;
          this.ngOnInit();
        },
        error: (err) => {
          this.showToast('error', 'Erro!', err.error.message);
        },
      });
    }
  }

  load(): void {
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

  delete(service: ServicesInterface): void {
    const table = { table: 'procedures' };
    console.log(table, service);

    this._appService.delete(table, service).subscribe({
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
