import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/shared/layout/layout.component';
import { LoginComponent } from './pages/showed/login/login.component';
import { RegisterComponent } from './pages/showed/register/register.component';
import { DashboardComponent } from './pages/showed/dashboard/dashboard.component';
import { EditorComponent } from './pages/showed/editor/editor.component';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditorComponent

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
    MenubarModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
