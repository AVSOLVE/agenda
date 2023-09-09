import { ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LayoutService } from "../../../services/Layout.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnChanges {

  model: any[] = [];
  sidebarStatus!: any;

  @Input() status!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    changes['status'].currentValue === false ? this.sidebarStatus = {'display' : 'none'} : this.sidebarStatus = {'display': ''};
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/'] },
          { label: 'Agenda', icon: 'pi pi-fw pi-clock', routerLink: ['/agenda'] },
          { label: 'Cadastrar', icon: 'pi pi-fw pi-plus', routerLink: ['/cadastrar'] },
          { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/'] },
          { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/'] },
          { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/'] },
          { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/'] },
        ]
      }
    ];
  }
}
