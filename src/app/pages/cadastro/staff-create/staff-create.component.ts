import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NameValueInterface } from "../../shared/NameValue.interface";
import { Router } from "@angular/router";
import { AppServiceService } from "src/app/AppService.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  genders!: NameValueInterface[];
  procedures!: NameValueInterface[];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor(
    private _router:Router,
    private _appService: AppServiceService,
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this.clearUserForm();
    this.setGenders();
    this.loadProcedures();
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      sexo: new FormControl(''),
      data_nascimento: new FormControl(''),
      procedures: new FormControl(''),
    });
  }

  setGenders():void{
    this.genders = [
      { name: 'Feminino', value: 'F' },
      { name: 'Masculino', value: 'M' },
      { name: 'Outro', value: 'O' },
    ];
  }

  loadProcedures(): void {
    const table = { table: 'procedures' }
    const route = 'procedure';
    this._appService.load(route, table)
      .subscribe({
        next: (res) => {
          this.procedures = res.data;
          this.showToast('success', 'Successo!', res.message);
        },
        error: (err) => {
          this.showToast('error', 'Erro!', err.error.message);
        }
      });
  }

  save(): void {
    const data = this.userForm.value;
    const table = 'staff';
    this._appService.save(table, data).subscribe({
      next: (res) => {
        this.showToast('success', 'Sucesso!', res.message)
        this.clearUserForm();
        this._router.navigate(['/cadastrar']);
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
      }
    });
  }

  cancel() {
    this.clearUserForm();
    this._router.navigate(['/home'])
  }
}
