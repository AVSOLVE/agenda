import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  itemsMenu: MenuItem[] | undefined;
  userMenu: MenuItem[] | undefined;

  ngOnInit() {
    this.itemsMenu = [
      {
        label: 'Agenda',
        icon: 'pi pi-fw pi-file',
        routerLink: 'home',
      },
      {
        label: 'Cadastros',
        routerLink: 'cadastrar',
        icon: 'pi pi-fw pi-pencil',
      },
    ];
    this.userMenu = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        routerLink:'login',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Configurações',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            separator: true
          },
          {
            label: 'Sair',
            icon: 'pi pi-fw pi-users',
          }
        ]
      },
    ]
  }
}
