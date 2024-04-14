const weatherIconsMap: Record<string, string> = {
	'1': '/assets/icons/01-s.png',
	'2': '/assets/icons/02-s.png',
	'3': '/assets/icons/03-s.png',
	'4': '/assets/icons/04-s.png',
	'5': '/assets/icons/05-s.png',
	'6': '/assets/icons/06-s.png',
	'7': '/assets/icons/07-s.png',
	'8': '/assets/icons/08-s.png',
	'11': '/assets/icons/11-s.png',
	'12': '/assets/icons/12-s.png',
	'13': '/assets/icons/13-s.png',
	'14': '/assets/icons/14-s.png',
	'15': '/assets/icons/15-s.png',
	'16': '/assets/icons/16-s.png',
	'17': '/assets/icons/17-s.png',
	'18': '/assets/icons/18-s.png',
	'19': '/assets/icons/19-s.png',
	'20': '/assets/icons/20-s.png',
	'21': '/assets/icons/21-s.png',
	'22': '/assets/icons/22-s.png',
	'23': '/assets/icons/23-s.png',
	'24': '/assets/icons/24-s.png',
	'25': '/assets/icons/25-s.png',
	'26': '/assets/icons/26-s.png',
	'29': '/assets/icons/29-s.png',
	'30': '/assets/icons/30-s.png',
	'31': '/assets/icons/31-s.png',
	'32': '/assets/icons/32-s.png',
	'33': '/assets/icons/33-s.png',
	'34': '/assets/icons/34-s.png',
	'35': '/assets/icons/35-s.png',
	'36': '/assets/icons/36-s.png',
	'37': '/assets/icons/37-s.png',
	'38': '/assets/icons/38-s.png',
	'39': '/assets/icons/39-s.png',
	'40': '/assets/icons/40-s.png',
	'41': '/assets/icons/41-s.png',
	'42': '/assets/icons/42-s.png',
	'43': '/assets/icons/43-s.png',
	'44': '/assets/icons/44-s.png',
}

export const getWeatherIcon = (icon: number) => {
	return weatherIconsMap[icon.toString()];
}
