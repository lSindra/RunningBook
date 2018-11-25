import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BntSaveComponent } from './bnt-save.component';

describe('BntSaveComponent', () => {
  let component: BntSaveComponent;
  let fixture: ComponentFixture<BntSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BntSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BntSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
