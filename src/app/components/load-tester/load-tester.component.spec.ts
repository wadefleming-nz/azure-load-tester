import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTesterComponent } from './load-tester.component';

describe('LoadTesterComponent', () => {
  let component: LoadTesterComponent;
  let fixture: ComponentFixture<LoadTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
