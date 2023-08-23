import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { EditarComponent } from "./pages/editar/editar.component";
import { CriarComponent } from "./pages/criar/criar.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'editar', component: EditarComponent
  },
  {
    path: 'criar', component: CriarComponent
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
