import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  status!:boolean;

  toggleSidebar($event:boolean) {
    this.status = $event;
  }
}
