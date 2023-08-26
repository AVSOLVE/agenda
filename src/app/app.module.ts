import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimengModule } from "./primeng.module";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./pages/shared/header/header.component";
import { EditarComponent } from "./pages/agendamento/editar/editar.component";
import { CriarComponent } from "./pages/agendamento/criar/criar.component";
import { CadastrarComponent } from "./pages/cadastro/cadastrar.component";
import { UserCreateComponent } from "./pages/cadastro/user-create/user-create.component";
import { StaffCreateComponent } from "./pages/cadastro/staff-create/staff-create.component";
import { FooterComponent } from "./pages/shared/footer/footer.component";
import { MessageService } from "primeng/api";
import { ClientCreateComponent } from "./pages/cadastro/client-create/client-create.component";

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
    FooterComponent
  ],
  imports: [
    PrimengModule,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
