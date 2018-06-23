import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { AuthModule } from './modules/auth/auth.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { SharedModule } from './modules/shared/shared.module';
import { NotificationService } from './shared/services/notifications.service';
import { AdminsModule } from './modules/admins/admins.module';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    NavMenuComponent,
    HomeComponent
  ],
  imports: [
    SharedModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    AdminsModule,
    ErrorsModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
      autoFocus: false
    }),
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