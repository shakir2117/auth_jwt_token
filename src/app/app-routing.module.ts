import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './admin/register/register.component';

const routes: Routes = [
  {
    path:'home',loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
