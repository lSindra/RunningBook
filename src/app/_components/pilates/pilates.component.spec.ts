import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilatesComponent } from './pilates.component';

describe('PilatesComponent', () => {
  let component: PilatesComponent;
  let fixture: ComponentFixture<PilatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
