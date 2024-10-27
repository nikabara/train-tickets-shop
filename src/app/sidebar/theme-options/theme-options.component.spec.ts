import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeOptionsComponent } from './theme-options.component';

describe('LanguageOptionsComponent', () => {
  let component: ThemeOptionsComponent;
  let fixture: ComponentFixture<ThemeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
