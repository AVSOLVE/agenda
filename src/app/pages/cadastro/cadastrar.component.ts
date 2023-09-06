import { Component } from '@angular/core';
import { TabViewChangeEvent } from 'primeng/tabview';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {

  selectTypeUser($event: TabViewChangeEvent) {
  }
}
