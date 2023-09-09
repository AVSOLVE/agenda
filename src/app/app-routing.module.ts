import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/layout/login/login.component";
import { EditarComponent } from "./pages/agenda/editar/editar.component";
import { CriarComponent } from "./pages/agenda/criar/criar.component";
import { CadastrarComponent } from "./pages/cadastro/cadastrar.component";
import { UserCreateComponent } from "./pages/cadastro/user-create/user-create.component";
import { HeroComponent } from "./pages/layout/hero/hero.component";
import { AgendaComponent } from "./pages/agenda/agenda.component";

const routes: Routes = [
  {
    path: 'agenda', component: AgendaComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HeroComponent
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
  imports: [
    RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
