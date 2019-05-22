import { Component, EventEmitter } from '@angular/core';

export class NgxMockComponent {}

export function MockComponent(obj: Component, interfaceImplementations?: object[]) {

    if (obj.outputs) {
        obj.outputs.forEach(item => {
            (NgxMockComponent as any).prototype[item] = new EventEmitter<any>();
        });
    }

    if (interfaceImplementations) {
        interfaceImplementations.forEach((i: object) => {
            Object.keys(i).forEach((k: any) => {
                (NgxMockComponent as any).prototype[k] = (i as any)[k];
            });
        });
    }

    return Component(obj)(NgxMockComponent);
}
