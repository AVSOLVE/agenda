import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { EditarComponent } from "./pages/agendamento/editar/editar.component";
import { CriarComponent } from "./pages/agendamento/criar/criar.component";
import { CadastrarComponent } from "./pages/cadastro/cadastrar.component";
import { UserCreateComponent } from "./pages/cadastro/user-create/user-create.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'editar', component: EditarComponent
  },
  {
    path: 'criar', component: CriarComponent
  },
  {
    path: 'registrar', component: UserCreateComponent
  },
  {
    path: 'cadastrar', component: CadastrarComponent
  },
  {
    path: '', redirectTo:'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
