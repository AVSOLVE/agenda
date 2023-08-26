import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AppServiceService } from "src/app/AppService.service";
import { Moment } from "moment";

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CriarComponent implements OnInit {
  hours!: any[];
  clients!: any[];
  procedures!: any[];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor(
    private _router: Router,
    private _appService: AppServiceService
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

  saveAgenda(): void {
    const data = this.prepareData()
    const table = 'agenda';
    this._appService.saveOne(data, table).subscribe({});
    this.clearUserForm();
    this._router.navigate(['/home'])
  }

  prepareData() {
    const data = {
      name: this.userForm.value.name.name,
      date: new Date(this.userForm.value.date),
      procedure: this.userForm.value.procedure.name,
      hours: this.userForm.value.hours.name,
    };
    return data;
  }


  loadClients(): void {
    const table = { table: 'person' }
    this._appService.loadAll(table)
      .subscribe({
        next: (res) => {
          this.clients = res.data;
        }
      });
  }

  loadProcedures(): void {
    const table = { table: 'procedures' }
    this._appService.loadAll(table)
      .subscribe({
        next: (res) => {
          this.procedures = res.data;
        }
      });
  }

  loadHours(): void {
    const table = { table: 'hours' }
    this._appService.loadAll(table)
      .subscribe({
        next: (res) => {
          this.hours = res.data;
        }
      });
  }

}
