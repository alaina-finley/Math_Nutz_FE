import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIslandComponent } from './main-island.component';

describe('MainIslandComponent', () => {
  let component: MainIslandComponent;
  let fixture: ComponentFixture<MainIslandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainIslandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
