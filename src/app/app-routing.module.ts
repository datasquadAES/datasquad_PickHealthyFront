import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'orders',
    // loadChildren: () =>
    //   import('remoteApp/RemoteModule').then(m => m.RemoteModule),
    // import('yummiOrdersApp/PaymentsModule')

    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'yummiOrdersApp',
        exposedModule: './OrdersModule',})
      // import('yummiOrdersApp/PaymentsModule')
      .then((m) => m.OrdersModule),
  },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'signup', component: LoginComponent },
    { path: 'dashboard', component: HomeComponent,
      // canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
