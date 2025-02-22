import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPageDescriptionComponent } from './icon-page-description.component';

describe('IconPageDescriptionComponent', () => {
  let component: IconPageDescriptionComponent;
  let fixture: ComponentFixture<IconPageDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPageDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPageDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
