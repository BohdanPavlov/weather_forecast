import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForecastLineChartComponent } from './daily-forecast-line-chart.component';

describe('DailyForecastLineChartComponent', () => {
  let component: DailyForecastLineChartComponent;
  let fixture: ComponentFixture<DailyForecastLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyForecastLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyForecastLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
