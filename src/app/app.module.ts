import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { UserIdComponent } from './user-id/user-id.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HtmlOutletDirective } from './html-outlet.directive';
import { ValidateCredentialsComponent } from './validate-credentials/validate-credentials.component';
import { LoginService} from './services/login.service';



@NgModule({
  declarations: [
    AppComponent,
    GlobalHeaderComponent,
    GlobalFooterComponent,
    UserIdComponent,
    PageNotFoundComponent,
    HtmlOutletDirective,
    ValidateCredentialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
