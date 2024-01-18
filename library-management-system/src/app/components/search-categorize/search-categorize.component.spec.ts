import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCategorizeComponent } from './search-categorize.component';

describe('SearchCategorizeComponent', () => {
  let component: SearchCategorizeComponent;
  let fixture: ComponentFixture<SearchCategorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCategorizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCategorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
