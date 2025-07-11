import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { TableComponent } from './components/skeletons/table/table.component';
import { MenuListComponent } from './components/menu/menu-list/menu-list.component';
import { CartSidebarComponent } from './components/sidebar/cart-sidebar/cart-sidebar.component';
import { CartItemComponent } from './components/sidebar/cart-item/cart-item.component';
import { HomeRestaurantComponent } from './pages/home-restaurant/home-restaurant.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { StepperModule } from 'primeng/stepper';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OrdersComponent } from './pages/orders/orders.component';
import { CalendarModule } from 'primeng/calendar';
import { GoogleMapsModule } from '@angular/google-maps';
import { HomeDealerComponent } from './pages/home-dealer/home-dealer.component';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    UsersComponent,
    TableComponent,
    MenuListComponent,
    CartSidebarComponent,
    CartItemComponent,
    OrdersComponent,
    HomeDealerComponent,
    HomeRestaurantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    SkeletonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    CarouselModule,
    TagModule,
    SidebarModule,
    ProgressSpinnerModule,
    FieldsetModule,
    DataViewModule,
    DropdownModule,
    StepperModule,
    ChipModule,
    ToastModule,
    RippleModule,
    RadioButtonModule,
    CalendarModule,
    GoogleMapsModule,
    AccordionModule,
    ToolbarModule,
    DividerModule,
    DialogModule,
    ListboxModule,
  ],
  providers: [
    MessageService,
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
