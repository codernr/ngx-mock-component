# ngx-mock-component [![npm version](https://badge.fury.io/js/%40codernr%2Fngx-mock-component.svg)](https://badge.fury.io/js/%40codernr%2Fngx-mock-component)
Angular utility to mock any component in unit tests. Lets you mock any component in `TestBed.configureTestingModule` declarations without creating new mock classes.

```
npm i -D @codernr/ngx-mock-component
```

## Usage

* `mockComponent(obj: Component, interfaceImplementations: { [key: string]: any }[])`  
    The first parameter is the component metadata (that you normally use in @Component decorator, the second one is an array of objects that mock the interfaces implemented by the component. (For example `ControlValueAccessor`)
* `NgxMockComponent` can be used in providers as reference token for the mocked component

## Example

Real world example with a component using [ngx-captcha](https://www.npmjs.com/package/ngx-captcha) in its template.

`app.component.html`

```html
<div style="text-align:center">
  <h1>
    Welcome!
  </h1>
</div>
<div>
  <form [formGroup]="exampleForm">
    <ngx-recaptcha2 [siteKey]="siteKey" useGlobalDomain="false" formControlName="captcha"></ngx-recaptcha2>
  </form>
</div>
```

`app.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  public siteKey = 'mySiteKey';

  public exampleForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.exampleForm = this.fb.group({
      captcha: ['', [Validators.required]]
    });
  }
}
```

`app.component.spec.ts`

```typescript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mockComponent, NgxMockComponent } from '@codernr/ngx-mock-component';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        AppComponent,
        mockComponent({
          selector: 'ngx-recaptcha2',
          template: '',
          inputs: ['siteKey', 'useGlobalDomain'],
          providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: NgxMockComponent, multi: true }
          ]
        }, [
           // mock implementation of ControlValueAccessor
          { writeValue: (obj: any) => {}, registerOnChange: (fn: any) => {}, registerOnTouched: (fn: any) => {} }
        ])
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome!');
  });
});
```
