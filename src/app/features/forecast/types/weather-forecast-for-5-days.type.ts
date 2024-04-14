type Headline = {
	EffectiveDate: string;
	EffectiveEpochDate: number;
	Severity: number;
	Text: string;
	Category: string;
	EndDate: string;
	EndEpochDate: number;
	MobileLink: string;
	Link: string;
}

type Temperature = {
	Minimum: {
		Value: number;
		Unit: string;
		UnitType: number;
	};
	Maximum: {
		Value: number;
		Unit: string;
		UnitType: number;
	};
}

type DayNightForecast = {
	Icon: number;
	IconPhrase: string;
	HasPrecipitation: boolean;
	PrecipitationType?: string;
	PrecipitationIntensity?: string;
}

type DailyForecast = {
	Date: string;
	EpochDate: number;
	Temperature: Temperature;
	Day: DayNightForecast;
	Night: DayNightForecast;
	Sources: string[];
	MobileLink: string;
	Link: string;
}

export type WeatherForecastFor5Days = {
	Headline: Headline;
	DailyForecasts: DailyForecast[];
}
