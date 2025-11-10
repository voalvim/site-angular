import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt-PT';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CapitalizeDatePipe } from './pipes/capitalize-date.pipe';
import { TimeComponent } from './time/time.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    CapitalizeDatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TimeComponent,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }