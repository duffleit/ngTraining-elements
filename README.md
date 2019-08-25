# Angular Elements

This exercise helps you in understanding the usage of Angular Elements and dynamic lazy loading mechanisms.

## Tasks

### Create Element

1. Create a new application with `ng n elements-app`.

2. Create an `elements/`-folder within the `src` dictionary. 

3. Create a new module in this folder `ng g m user-widget` and add a `user-widget` component to it.

4. Add support for Angular elements with `ng add @angular/elements`

5. Register your component as a custom element, and add it as entryComponents in the corresponding module: 

```
  constructor(private injector: Injector) {
    const element = createCustomElement(UserWidgetComponent, { injector: this.injector });
    customElements.define('user-widget', element);
  }
```

6. Add `CUSTOM_ELEMENTS_SCHEMA` to your application: 

```
@NgModule({
  […]
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
```

7. Use your custom element to your `index.html`.

### Lazy Load Element

1. Remove your user-widget module form your app-module imports. 

2. Add it to the lazyModule of the `angular.json` (via: `projects/?/architect/build/options`):

```
"lazyModules": [
  "src/app/elements/user-widget/user-widget.module"
],
```

3. Create a service which can lazyload these elements:

```
@Injectable({
    providedIn: 'root'
})
export class CustomElementLoadingService {

    constructor(
        private loader: NgModuleFactoryLoader,
        private injector: Injector
    ) {
    }

    private moduleRefs: { [key: string]: NgModuleRef<any> } = {};

    load(widgetFileName: string, widgetTypeName: string): Promise<void> {
        if (this.moduleRefs[widgetFileName + widgetTypeName]) {
            return Promise.resolve();
        }

        const path = `src/app/elements/${widgetFileName}#${widgetTypeName}`;

        return this
            .loader
            .load(path)
            .then(moduleFactory => {
                this.moduleRefs[widgetFileName + widgetTypeName] = moduleFactory.create(this.injector).instance;
            })
            .catch(error => {
                console.error(`Could not load widget ${widgetTypeName} (from: ${widgetFileName}.ts)`, error);
            });

    }
}
```

4. Use the `user-widget` in your application. 

### Create a custom-element with StencilJS: 

1. Create a new StencilJS Component library: 

```
npm init stencil
select component
```

2. Create a user-widget in stencil: 

```
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'user-widget',
})
export class UserWidgetComponent {

  @Prop() name: string;

  render() {
    return (
      <div>
        Hi, {this.name}.
      </div>
    );
  }
}
```

3. Set the StencilJS bulid target to `web`. 

4. Build the StencilJS component. 

5. Register the stencil component: 

```
import { defineCustomElements } from 'user-widget/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements(window);
```

6. Access the stencil component via `ViewChild` from angular: 

```
@ViewChild('ref') userWidgetComponent: ElementRef<HTMLUserWidgetElement>;
```

### Create Angular components without Zone.js: 

1. Disable ZoneJS for your application: 

```
platformBrowserDynamic()
   .bootstrapModule(
       AppModule, { ngZone: 'noop' })
   .catch(err => console.log(err));
```

2. Trigger change detection manually: 

```
constructor(private cd: ChangeDetectorRef) { }

changeSomeState(): void {
  // change some component state here
  this.cd.markForCheck();
}

```

3. Bonus: Use the [push-pipe]("https://raw.githubusercontent.com/Toxicable/angular/798ce0b5288c7a8b522d1ca710a4f64e427e931c/packages/common/src/pipes/push_pipe.ts") and a `BehaviorSubject` instead.
```

```
