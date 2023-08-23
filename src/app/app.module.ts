import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimengModule } from "./primeng.module";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { HeaderComponent } from "./pages/shared/header/header.component";
import { EditarComponent } from "./pages/editar/editar.component";
import { CriarComponent } from "./pages/criar/criar.component";
import { CadastrarComponent } from "./pages/cadastrar/cadastrar.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { StaffCreateComponent } from "./pages/staff-create/staff-create.component";
import { FooterComponent } from "./pages/shared/footer/footer.component";
import { MessageService } from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
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
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
