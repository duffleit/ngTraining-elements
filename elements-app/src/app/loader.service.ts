import { Injectable, NgModuleFactoryLoader, Injector, NgModuleRef } from '@angular/core';

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