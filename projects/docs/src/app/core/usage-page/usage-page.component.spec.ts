import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagePageComponent } from './usage-page.component';

describe('UsagePageComponent', () => {
  let component: UsagePageComponent;
  let fixture: ComponentFixture<UsagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
