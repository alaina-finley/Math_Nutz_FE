import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLevelComponent } from './home-level.component';

describe('HomeLevelComponent', () => {
  let component: HomeLevelComponent;
  let fixture: ComponentFixture<HomeLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
