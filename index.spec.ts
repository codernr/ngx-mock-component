import { mockComponent, NgxMockComponent } from './index';
import { EventEmitter } from '@angular/core';

describe('MockComponent', () => {

    it('should add interface implementation to prototype', () => {
        const t = mockComponent({}, [{ interfaceMethod: () => 'hello' }]);

        const obj = new t();

        expect(obj.interfaceMethod()).toBe('hello');
    });

    it ('should add eventemitters for outputs', () => {
        const t = mockComponent({ outputs: [ 'a', 'b' ]});

        const obj = new t();

        expect(obj.a).toEqual(jasmine.any(EventEmitter));
        expect(obj.b).toEqual(jasmine.any(EventEmitter));
    });
});
