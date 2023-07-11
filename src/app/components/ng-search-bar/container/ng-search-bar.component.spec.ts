import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSearchBarComponent } from './ng-search-bar.component';

describe('NgSearchBarComponent', () => {
  let component: NgSearchBarComponent;
  let fixture: ComponentFixture<NgSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
