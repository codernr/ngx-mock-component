import { Component, EventEmitter } from '@angular/core';

export class NgxMockComponent {
    [x: string]: any;
}

export function mockComponent(obj: Component, interfaceImplementations?: { [key: string]: any }[]) {

    NgxMockComponent.prototype = {};

    if (obj.outputs) {
        obj.outputs.forEach(item => {
            NgxMockComponent.prototype[item] = new EventEmitter<any>();
        });
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
