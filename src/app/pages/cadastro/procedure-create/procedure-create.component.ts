import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { appService } from "src/app/services/app.service";
import { SelectParamsInterface } from "src/app/services/select-params.type";

@Component({
  selector: 'app-procedure-create',
  templateUrl: './procedure-create.component.html',
  styleUrls: ['./procedure-create.component.css']
})

export class ProcedureCreateComponent implements OnInit {
  userForm!: FormGroup;
  procedures: SelectParamsInterface[] = [
    {id: 1, value: '10', label: 'Fisio1'},
    {id: 2, value: '20', label: 'Fisio2'},
    {id: 3, value: '30', label: 'Fisio3'}
  ]

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _appService: appService,
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadForm();
    // this.loadProcedures();
  }

  showToast(severity: string, summary: string, detail: any): void {
    this._messageService.add({ severity, summary, detail });
  }

  loadForm(): void {
    this.userForm = this._fb.group({
      value: null,
      label:null,
    });
  }

  saveProcedure(): void {
    const data = this.userForm.value;
    const table = 'procedures';
    this._appService.save(table, data).subscribe({
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
          let tempprocedures = res.data;
          this.procedures = tempprocedures.sort()

          this.showToast('success', 'Successo!', res.message);
        },
        error: (err) => {
          this.showToast('error', 'Erro!', err.error.message);
        }
      });
  }

  cancel() {
    this.loadForm();
    this._router.navigate(['/home'])
  }
}
