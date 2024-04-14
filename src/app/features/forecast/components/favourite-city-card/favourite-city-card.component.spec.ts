import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteCityCardComponent } from './favourite-city-card.component';

describe('FavouriteCityCardComponent', () => {
  let component: FavouriteCityCardComponent;
  let fixture: ComponentFixture<FavouriteCityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteCityCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteCityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
