import { Component, EventEmitter } from '@angular/core';

export function mockComponent(obj: Component, interfaceImplementations?: { [key: string]: any }[]) : any {

    class NgxMockComponent {
        [x: string]: any;
    }

    if (obj.outputs) {
        obj.outputs.forEach(item => {
            NgxMockComponent.prototype[item] = new EventEmitter<any>();
        });
    }

    if (obj.inputs) {
        obj.inputs.forEach(item => {
            NgxMockComponent.prototype[item] = null;
        })
    }

    if (interfaceImplementations) {
        interfaceImplementations.forEach((i) => {
            Object.keys(i).forEach((k: any) => {
                NgxMockComponent.prototype[k] = i[k];
            });
        });
    }

    return Component(obj)(NgxMockComponent);
}
