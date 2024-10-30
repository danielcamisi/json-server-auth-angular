import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/shared/layout/layout.component';                   
import { LoginComponent } from './pages/showed/login/login.component';                    
import { RegisterComponent } from './pages/showed/register/register.component';
import { DashboardComponent } from './pages/showed/dashboard/dashboard.component';
import { EditorComponent } from './pages/showed/editor/editor.component';
import { TableComponent } from './pages/showed/table/table.component';
import { AuthInterceptor } from './pages/core/interceptor.service';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditorComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    RadioButtonModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    CardModule,
    MenubarModule,
    AccordionModule,
    ConfirmPopupModule,
    AvatarModule,
    AvatarGroupModule,
    MessagesModule,
    NgxSpinnerModule,
    TableModule,
  ],
  providers: [DialogService, ConfirmationService, MessageService, NgxSpinnerService, provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }