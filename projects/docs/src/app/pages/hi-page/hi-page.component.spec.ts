import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiPageComponent } from './hi-page.component';

describe('HiPageComponent', () => {
  let component: HiPageComponent;
  let fixture: ComponentFixture<HiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
