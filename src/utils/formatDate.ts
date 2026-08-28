const dateLocales = {
	en: 'en-GB',
	pl: 'pl-PL',
} as const;

export function formatDate(date: Date, locale: string): string {
	const dateLocale = locale === 'pl' ? dateLocales.pl : dateLocales.en;

	return new Intl.DateTimeFormat(dateLocale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	}).format(date);
}
