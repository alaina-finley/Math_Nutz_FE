import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLevelComponent } from './game-level.component';

describe('GameLevelComponent', () => {
  let component: GameLevelComponent;
  let fixture: ComponentFixture<GameLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
