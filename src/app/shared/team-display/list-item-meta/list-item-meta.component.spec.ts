import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemMetaComponent } from './list-item-meta.component';

describe('ListItemMetaComponent', () => {
  let component: ListItemMetaComponent;
  let fixture: ComponentFixture<ListItemMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemMetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
