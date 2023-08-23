import { Component } from '@angular/core';
import { TableHeaderCheckboxToggleEvent, TableLazyLoadEvent, TablePageEvent } from 'primeng/table';

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
toggleDeleteOnSelection: any;


visible: boolean = false;

showDialog() {
    this.visible = true;
}

delete() {
throw new Error('Method not implemented.');
}
create() {
throw new Error('Method not implemented.');

}
update() {
throw new Error('Method not implemented.');
}
rowData: any;
toggleEditOnSelection: any;
onHeaderCheckboxToggle($event: TableHeaderCheckboxToggleEvent) {
throw new Error('Method not implemented.');
}

  selectedUser: any = null
  cols!: Column[];
  products!: any[];


onPage($event: TablePageEvent) {
throw new Error('Method not implemented.');
}
loadData($event: TableLazyLoadEvent) {
throw new Error('Method not implemented.');
}

  constructor() { }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'procedure', header: 'Procedimento' },
      { field: 'date', header: 'Data' },
      { field: 'time', header: 'Horario' },
      { field: 'inventoryStatus', header: 'Status' },
    ];
    this.products = [
      {
        id: '1000',
        date: '22/12/2015',
        name: 'Alexandre Lima',
        especialist: 'Dra. Dayanne',
        image: 'bamboo-watch.jpg',
        price: 65,
        procedure: 'Fisioterapia',
        time: 14,
        inventoryStatus: 'Ativo',
        rating: 5
      },
      {
        id: '1000',
        date: '22/12/2015',
        name: 'Aline Silva',
        especialist: 'Dra. Dayanne',
        image: 'bamboo-watch.jpg',
        price: 65,
        procedure: 'Fisioterapia',
        time: 14,
        inventoryStatus: 'Ativo',
        rating: 5
      },
      {
        id: '1000',
        date: '22/12/2015',
        name: 'Pedro Pascal',
        especialist: 'Dra. Dayanne',
        image: 'bamboo-watch.jpg',
        price: 65,
        procedure: 'Fisioterapia',
        time: 14,
        inventoryStatus: 'Ativo',
        rating: 5
      },

    ]
  }
}
