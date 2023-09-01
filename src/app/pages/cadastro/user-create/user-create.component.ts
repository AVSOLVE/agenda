import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NameValueInterface } from "../../shared/NameValue.interface";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AppServiceService } from "src/app/AppService.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  genders!: NameValueInterface[];
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
    });
  }

  setGenders():void{
    this.genders = [
      { name: 'Feminino', value: 'F' },
      { name: 'Masculino', value: 'M' },
      { name: 'Outro', value: 'O' },
    ];
  }

  save(): void {
    const data = this.userForm.value;
    const table = 'users';
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
