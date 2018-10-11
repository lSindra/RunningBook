import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingOverviewComponent } from './ranking-overview.component';

describe('RankingOverviewComponent', () => {
  let component: RankingOverviewComponent;
  let fixture: ComponentFixture<RankingOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
