import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDisplayComponent } from './team-display.component';

describe('TeamDisplayComponent', () => {
  let component: TeamDisplayComponent;
  let fixture: ComponentFixture<TeamDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
