import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaPageComponent } from './fa-page.component';

describe('FaPageComponent', () => {
  let component: FaPageComponent;
  let fixture: ComponentFixture<FaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
