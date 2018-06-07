import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProvidersModule } from './modules/provider/providers.module';
import { AuthModule } from './modules/auth/auth.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { NotificationService } from './shared/services/notifications.service';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    NavMenuComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    // SharedModule,    
    SharedModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    ProvidersModule,
    ErrorsModule,

    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }