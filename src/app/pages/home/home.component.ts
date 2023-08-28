import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TableHeaderCheckboxToggleEvent, TableLazyLoadEvent, TablePageEvent } from 'primeng/table';
import { AppServiceService } from "src/app/AppService.service";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  selectedUser!: any;
  agenda!: any[];
  cols!: Column[];
  rowData: any;
  toggleEditOnSelection: any;
  toggleDeleteOnSelection: any;

  constructor(private _router: Router, private _appService: AppServiceService) { }

  ngOnInit() {
    this.loadData()
    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'procedure', header: 'Procedimento' },
      { field: 'date', header: 'Data' },
      { field: 'hours', header: 'Horario' }
    ];
  }

  delete(): void {
    const data = this.selectedUser[0].id;
    const table = { table:'agenda'};
    this._appService.deleteOne(data, table).subscribe({
      next: (res) => {
        this.selectedUser = null;
        this.loadData();
      }
    });
  }

  create() {
    this._router.navigate(['/criar']);
  }

  update() {
    this._router.navigate(['/editar'])
  }


  onHeaderCheckboxToggle($event: TableHeaderCheckboxToggleEvent) {
    throw new Error('Method not implemented.');
  }

  onPage($event: TablePageEvent) {
    throw new Error('Method not implemented.');
  }

  loadData(): void {
    const table = { table: 'agenda' }
    this._appService.loadAll(table)
      .subscribe({
        next: (res) => {
          this.agenda = res.data;
        }
      });
  }
}
