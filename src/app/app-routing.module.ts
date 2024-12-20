import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/shared/layout/layout.component';
import { DashboardComponent } from './pages/showed/dashboard/dashboard.component';
import { LoginComponent } from './pages/showed/login/login.component';
import { RegisterComponent } from './pages/showed/register/register.component';
import { AuthGuard } from './pages/core/guard.service';
import { TableComponent } from './pages/showed/table/table.component';
import { AgendaComponent } from './pages/showed/agenda/agenda.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
      children:[
        {path:'', redirectTo: 'login', pathMatch:'full'},
        {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        {path:'projects', component: TableComponent, canActivate: [AuthGuard] },
        {path:'login', component: LoginComponent},
        {path:'register', component: RegisterComponent},
        {path:'agenda', component:AgendaComponent}
      ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
