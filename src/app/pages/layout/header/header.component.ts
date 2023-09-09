import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  items!: MenuItem[];
  name!: boolean;

  @Output() toggleSB: EventEmitter<boolean> = new EventEmitter

  public toggleSidebar() {
    this.name = !this.name;
    this.toggleSB.emit(this.name);
  }
}
