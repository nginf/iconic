import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDetailComponent } from './icon-detail.component';

describe('IconDetailComponent', () => {
  let component: IconDetailComponent;
  let fixture: ComponentFixture<IconDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
