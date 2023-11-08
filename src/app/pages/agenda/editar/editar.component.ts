import { Component, OnInit, ViewEncapsulation, LOCALE_ID, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { appService } from "src/app/services/app.service";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditarComponent {
  hours!: any[];
  clients: any[] = [{ 'name': 'teste' }];
  procedures!: any[];
  userForm!: FormGroup;
  currentDate = new Date();
  name!: string | number | null;

  constructor(
    private _router: Router,
    private _appService: appService,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit() {
    this.clearUserForm();
    this.loadClients();
    this.loadProcedures();
    this.loadHours();
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      date: new FormControl(''),
      procedure: new FormControl(''),
      hours: new FormControl(''),
    });
  }

  cancel() {
    this.clearUserForm();
    this._router.navigate(['/home'])
  }

  updateAgenda(): void {
    const data = this.prepareData();
    const table = 'agenda';
    this._appService.update(table, data).subscribe({});
    this.clearUserForm();
    this._router.navigate(['/home'])
  }

  prepareData() {
    const date = formatDate(this.userForm.value.date, 'dd/MM/yyyy', this.locale)
    const data = {
      name: this.userForm.value.name.name,
      date: date,
      procedure: this.userForm.value.procedure.name,
      hours: this.userForm.value.hours.name,
    };
    return data;
  }


  loadClients(): void {
    const table = { table: 'person' }
    const route = 'user';
    this._appService.load(route, table)
      .subscribe({
        next: (res) => {
          this.clients = res.data;
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

}
