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

    it ('should add input properties', () => {
        const t = mockComponent({ inputs: ['a', 'b']});

        const obj = new t();

        expect(obj.a).toBeDefined();
        expect(obj.b).toBeDefined();
    })

    it ('should not override previously defined prototype', () => {
        const t = mockComponent({ inputs: ['a']});

        const t2 = mockComponent({}, [{ interfaceMethod: () => 'hello' }]);

        expect(t.prototype instanceof NgxMockComponent).toBe(true);
        expect(t2.prototype instanceof NgxMockComponent).toBe(true);
        expect(t2.prototype.interfaceMethod()).toBe('hello');
        expect(t.prototype.a).toBeDefined();
    })
});
