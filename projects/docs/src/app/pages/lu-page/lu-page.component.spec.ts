import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuPageComponent } from './lu-page.component';

describe('LuPageComponent', () => {
  let component: LuPageComponent;
  let fixture: ComponentFixture<LuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
