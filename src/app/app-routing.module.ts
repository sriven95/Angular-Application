import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NewUserComponent } from './component/new-user/new-user.component';
import { HeaderComponent } from './component/header/header.component';
import { DisplayComponent } from './component/display/display.component';
import { EditComponent } from './component/edit/edit.component';
import { AuthGuard} from './services/auth.guard';
import { DemoComponent } from './component/demo/demo.component';
import { AdmindisplayComponent } from './component/admindisplay/admindisplay.component';
import { HomepageComponent } from './component/homepage/homepage.component';

const routes: Routes = [
  {path:'', redirectTo:'homepage', pathMatch : 'full' },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'header', component: HeaderComponent,canActivate: [AuthGuard]},
  {path: 'homepage', component: HomepageComponent},
  {path : 'login', component : LoginComponent,canActivate: [AuthGuard]},
  {path: 'new', component: NewUserComponent,canActivate: [AuthGuard]},
  {path : 'details', component: DisplayComponent,canActivate: [AuthGuard]},
  {path : 'userdetails', component: AdmindisplayComponent,canActivate: [AuthGuard]},
  {path :'edit/:email', component : EditComponent,canActivate: [AuthGuard]},
  {path : 'lazyuser', loadChildren: './component/lazy/lazy.module#LazyModule',canActivate: [AuthGuard]},
  {path : 'profile', component: DemoComponent,canActivate: [AuthGuard]},
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
