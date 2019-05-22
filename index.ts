import { Component, EventEmitter } from '@angular/core';

export class NgxMockComponent {}

export function MockComponent(obj: Component, interfaceImplementations?: object[]) {

    if (obj.outputs) {
        obj.outputs.forEach(item => {
            NgxMockComponent.prototype[item] = new EventEmitter<any>();
        });
    }

    if (interfaceImplementations) {
        interfaceImplementations.forEach(i => {
            Object.keys(i).forEach(k => {
                NgxMockComponent.prototype[k] = i[k];
            });
        });
    }

    return Component(obj)(NgxMockComponent);
}
