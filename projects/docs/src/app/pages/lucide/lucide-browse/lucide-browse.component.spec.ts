import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucideBrowseComponent } from './lucide-browse.component';

describe('LucideBrowseComponent', () => {
  let component: LucideBrowseComponent;
  let fixture: ComponentFixture<LucideBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucideBrowseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucideBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
