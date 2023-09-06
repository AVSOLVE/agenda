import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from "primeng/api";
import { LayoutService } from "../../../services/Layout.service";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { outputAst } from "@angular/compiler";

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
