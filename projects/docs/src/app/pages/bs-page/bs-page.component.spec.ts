import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsPageComponent } from './bs-page.component';

describe('BsPageComponent', () => {
  let component: BsPageComponent;
  let fixture: ComponentFixture<BsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
