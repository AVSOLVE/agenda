import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimeNgModule } from "./primeng.module";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./pages/layout/header/header.component";
import { EditarComponent } from "./pages/agendamento/editar/editar.component";
import { CriarComponent } from "./pages/agendamento/criar/criar.component";
import { CadastrarComponent } from "./pages/cadastro/cadastrar.component";
import { UserCreateComponent } from "./pages/cadastro/user-create/user-create.component";
import { StaffCreateComponent } from "./pages/cadastro/staff-create/staff-create.component";
import { FooterComponent } from "./pages/layout/footer/footer.component";
import { MessageService } from "primeng/api";
import { ClientCreateComponent } from "./pages/cadastro/client-create/client-create.component";
import { ProcedureCreateComponent } from "./pages/cadastro/procedure-create/procedure-create.component";
import { SidebarComponent } from "./pages/layout/sidebar/sidebar.component";
import { LayoutComponent } from "./pages/layout/layout.component";

@NgModule({
  declarations: [
    AppComponent,
    ClientCreateComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    EditarComponent,
    CriarComponent,
    CadastrarComponent,
    UserCreateComponent,
    StaffCreateComponent,
    FooterComponent,
    ProcedureCreateComponent,
    SidebarComponent,
    LayoutComponent
  ],
  imports: [
    PrimeNgModule,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
