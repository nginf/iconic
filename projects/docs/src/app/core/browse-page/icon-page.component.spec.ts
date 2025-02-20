import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPageComponent } from './icon-page.component';

describe('BrowsePageComponent', () => {
  let component: IconPageComponent;
  let fixture: ComponentFixture<IconPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
