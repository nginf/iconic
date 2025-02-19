import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucideUsageComponent } from './lucide-usage.component';

describe('LucideUsageComponent', () => {
  let component: LucideUsageComponent;
  let fixture: ComponentFixture<LucideUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucideUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucideUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
