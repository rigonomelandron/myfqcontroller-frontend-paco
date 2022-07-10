import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContenidoModule } from './contenido/contenido.module';
import { PrimengModule } from './primeng/primeng.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InterceptorService } from './interceptors/interceptor.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContenidoModule,
    SharedModule,
    PrimengModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()

  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService , multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
