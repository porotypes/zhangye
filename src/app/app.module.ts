import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// module
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
