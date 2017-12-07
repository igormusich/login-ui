import { Component, Directive, Input, ComponentRef, ViewContainerRef, Compiler, NgModule, ComponentFactory, ReflectiveInjector, ModuleWithComponentFactories } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
  const cmpClass = class DynamicComponent { };
  const decoratedCmp = Component(metadata)(cmpClass);

  @NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [decoratedCmp]
  }) class DynamicHtmlModule { }

  return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories
        .find(x => x.componentType === decoratedCmp);
    });
}

@Directive({ selector: 'html-outlet' })
export class HtmlOutletDirective {
  @Input() html: string;
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  ngOnChanges() {
    const html = this.html;
    if (!html) return;

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const compMetadata = new Component({
      selector: 'dynamic-html',
      template: html
    });

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
      });
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
