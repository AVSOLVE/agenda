import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AppServiceService } from "src/app/AppService.service";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})

export class ClientCreateComponent implements OnInit {
  genders = ['Masculino', 'Feminino'];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor(
    private _router: Router,
    private _appService: AppServiceService,
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this.clearUserForm();
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl(''),
    });
  }

  save(): void {
    const data = this.userForm.value;
    const table = 'clients';
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
