import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BossIslandComponent } from './boss-island.component';

describe('BossIslandComponent', () => {
  let component: BossIslandComponent;
  let fixture: ComponentFixture<BossIslandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossIslandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BossIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
