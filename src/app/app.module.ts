import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimeNgModule } from "./primeng.module";
import { LoginComponent } from "./pages/layout/login/login.component";
import { HeaderComponent } from "./pages/layout/header/header.component";
import { EditarComponent } from "./pages/agenda/editar/editar.component";
import { CriarComponent } from "./pages/agenda/criar/criar.component";
import { CadastrarComponent } from "./pages/cadastro/cadastrar.component";
import { UserCreateComponent } from "./pages/cadastro/user-create/user-create.component";
import { StaffCreateComponent } from "./pages/cadastro/staff-create/staff-create.component";
import { FooterComponent } from "./pages/layout/footer/footer.component";
import { ConfirmationService, MessageService } from "primeng/api";
import { ClientCreateComponent } from "./pages/cadastro/client-create/client-create.component";
import { ProcedureCreateComponent } from "./pages/cadastro/procedure-create/procedure-create.component";
import { SidebarComponent } from "./pages/layout/sidebar/sidebar.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { HeroComponent } from "./pages/layout/hero/hero.component";
import { AgendaComponent } from "./pages/agenda/agenda.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    ClientCreateComponent,
    LoginComponent,
    HeaderComponent,
    EditarComponent,
    CriarComponent,
    CadastrarComponent,
    UserCreateComponent,
    StaffCreateComponent,
    FooterComponent,
    ProcedureCreateComponent,
    SidebarComponent,
    LayoutComponent,
    HeroComponent,
    AgendaComponent,
   ],
  imports: [
    PrimeNgModule,
    CommonModule,
    FormsModule,
    TableModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
