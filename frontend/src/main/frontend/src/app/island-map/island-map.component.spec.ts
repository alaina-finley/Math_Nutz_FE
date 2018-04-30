import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandMapComponent } from './island-map.component';

describe('IslandMapComponent', () => {
  let component: IslandMapComponent;
  let fixture: ComponentFixture<IslandMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslandMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
