import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExpensionPanelComponent } from './task-expension-panel.component';

describe('TaskExpensionPanelComponent', () => {
  let component: TaskExpensionPanelComponent;
  let fixture: ComponentFixture<TaskExpensionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskExpensionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskExpensionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
