import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListTableComponent } from './components/user-list/user-list-table/user-list-table.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullNamePipe } from './pipes/fullname.pipe';
import { DateFormatPipe } from './pipes/dateformat.pipe';
import { PhoneNumberPipe } from './pipes/phonenumber.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UserListHeaderComponent } from './components/user-list/user-list-header/user-list-header.component';
import { UserListSectionComponent } from './components/user-list/user-list-section/user-list-section.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SearchUserComponent } from './components/search-user/search-user.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    UserListTableComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailsComponent,
    FullNamePipe,
    DateFormatPipe ,
    PhoneNumberPipe,
    UserListHeaderComponent,
    UserListSectionComponent,
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
