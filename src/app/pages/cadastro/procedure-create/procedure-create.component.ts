import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AppServiceService } from "src/app/AppService.service";

@Component({
  selector: 'app-procedure-create',
  templateUrl: './procedure-create.component.html',
  styleUrls: ['./procedure-create.component.css']
})

export class ProcedureCreateComponent implements OnInit {
  procedures!: any[];
  userForm!: FormGroup;

  constructor(
    private _router: Router,
    private _appService: AppServiceService,
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this.clearUserForm();
    this.loadProcedures();
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl('')
    });
  }

  saveProcedure(): void {
    const data = this.userForm.value;
    const table = 'procedures';
    this._appService.save(data, table).subscribe({
      next: (res) => {
        this.showToast('success', 'Successo!', res.message);
        this.ngOnInit();
      },
      error: (err) => {
        this.showToast('error', 'Erro!', err.error.message);
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
          this.showToast('success', 'Successo!', res.message);
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
