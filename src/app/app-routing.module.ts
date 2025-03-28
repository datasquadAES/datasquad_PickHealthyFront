import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HomeDealerComponent } from './pages/home-dealer/home-dealer.component';

const routes: Routes = [
  // {
  //   path: 'orders',
  //   // loadChildren: () =>
  //   //   import('remoteApp/RemoteModule').then(m => m.RemoteModule),
  //   // import('yummiOrdersApp/PaymentsModule')

  //   loadChildren: () =>
  //     loadRemoteModule({
  //       remoteEntry: 'http://localhost:4201/remoteEntry.js',
  //       remoteName: 'yummiOrdersApp',
  //       exposedModule: './OrdersModule',})
  //     // import('yummiOrdersApp/PaymentsModule')
  //     .then((m) => m.OrdersModule),
  // },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dealer', component: HomeDealerComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
