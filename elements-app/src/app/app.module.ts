import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { UserWidgetComponent } from 'src/app/elements/user-widget/user-widget/user-widget.component';
import { createCustomElement } from '@angular/elements'
import { UserWidgetModule } from 'src/app/elements/user-widget/user-widget.module';
import { HelloService } from './greet.service';
import { CustomElementLoadingService } from './loader.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
  ],
  schemas: [],
  providers: [HelloService],
  entryComponents: []
})
export class AppModule {
  constructor(private loaderService: CustomElementLoadingService) { }
  public ngDoBootstrap() {
    this.loaderService.load('user-widget/user-widget.module', 'UserWidgetModule');
  }
}
