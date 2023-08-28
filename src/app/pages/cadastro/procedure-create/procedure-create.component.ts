import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
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
    private _appService: AppServiceService
  ) { }

  ngOnInit() {
    this.clearUserForm();
    this.loadProcedures();
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl('')
    });
  }

  saveProcedure(): void {
    const data = this.userForm.value;
    const table = 'procedures';
    this._appService.newProcedure(data, table).subscribe({
      next: (res) => {
        this.ngOnInit();
      }
    });
  }

  loadProcedures(): void {
    const table = { table: 'procedures' }
    this._appService.loadProcedure(table)
      .subscribe({
        next: (res) => {
          this.procedures = res.data;
        }
      });
  }

  cancel() {
    this.clearUserForm();
    this._router.navigate(['/home'])
  }
}
