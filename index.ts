import { Component, EventEmitter } from '@angular/core';

export class NgxMockComponent {
    [x: string]: any;
}

export function mockComponent(obj: Component, interfaceImplementations?: { [key: string]: any }[]) : any {

    class ConcreteMockComponent extends NgxMockComponent {}

    if (obj.outputs) {
        obj.outputs.forEach(item => {
            ConcreteMockComponent.prototype[item] = new EventEmitter<any>();
        });
    }

    if (obj.inputs) {
        obj.inputs.forEach(item => {
            ConcreteMockComponent.prototype[item] = null;
        })
    }

    if (interfaceImplementations) {
        interfaceImplementations.forEach((i) => {
            Object.keys(i).forEach((k: any) => {
                ConcreteMockComponent.prototype[k] = i[k];
            });
        });
    }

    return Component(obj)(ConcreteMockComponent);
}
