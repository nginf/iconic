import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdPageComponent } from './md-page.component';

describe('MdPageComponent', () => {
  let component: MdPageComponent;
  let fixture: ComponentFixture<MdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
