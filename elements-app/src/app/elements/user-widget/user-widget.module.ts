import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { createCustomElement } from '@angular/elements';
import { PushPipe } from './user-widget/push.pipe';

@NgModule({
  declarations: [UserWidgetComponent, PushPipe],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [UserWidgetComponent]
})
export class UserWidgetModule {
  constructor(private injector: Injector) {
    const element = createCustomElement(UserWidgetComponent, { injector: this.injector });
    customElements.define('user-widget', element);
  }
}
