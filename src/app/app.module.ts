import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimengModule } from "./primeng.module";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { HeaderComponent } from "./pages/header/header.component";
import { EditarComponent } from "./pages/editar/editar.component";
import { CriarComponent } from "./pages/criar/criar.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    HeaderComponent,
    EditarComponent,
    CriarComponent
  ],
  imports: [
    PrimengModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
