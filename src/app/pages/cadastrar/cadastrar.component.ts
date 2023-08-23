import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabViewChangeEvent } from 'primeng/tabview';

type TypePerson = 0 | 1;

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  selectTypeUser($event: TabViewChangeEvent) {
    throw new Error('Method not implemented.');
  }
}
