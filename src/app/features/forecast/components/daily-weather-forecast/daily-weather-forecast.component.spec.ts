import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherForecastComponent } from './daily-weather-forecast.component';

describe('DailyWeatherForecastComponent', () => {
  let component: DailyWeatherForecastComponent;
  let fixture: ComponentFixture<DailyWeatherForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyWeatherForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyWeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
