export const HONG_KONG_TIME_ZONE = 'Asia/Hong_Kong';

const PLAIN_DATE_RE =
	/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/;

export function parseHongKongDate(value: string) {
	const trimmed = value.trim();
	const plainDate = trimmed.match(PLAIN_DATE_RE);
	const date = plainDate
		? new Date(
				`${plainDate[1]}-${plainDate[2]}-${plainDate[3]}T${plainDate[4] ?? '00'}:${plainDate[5] ?? '00'}:${plainDate[6] ?? '00'}+08:00`,
			)
		: new Date(trimmed);

	if (Number.isNaN(date.getTime())) {
		throw new Error(`Invalid date: ${value}`);
	}

	return date;
}

export function formatHongKongDate(date: Date | string) {
	const value = typeof date === 'string' ? new Date(date) : date;
	const datePart = new Intl.DateTimeFormat('en-US', {
		timeZone: HONG_KONG_TIME_ZONE,
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(value);
	const timePart = new Intl.DateTimeFormat('en-US', {
		timeZone: HONG_KONG_TIME_ZONE,
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	}).format(value);

	return `${datePart} ${timePart} (HKT)`;
}

export function formatHongKongISOString(date: Date | string) {
	const value = typeof date === 'string' ? new Date(date) : date;
	const hongKongTime = new Date(value.getTime() + 8 * 60 * 60 * 1000);
	const pad = (num: number) => num.toString().padStart(2, '0');

	return `${hongKongTime.getUTCFullYear()}-${pad(hongKongTime.getUTCMonth() + 1)}-${pad(hongKongTime.getUTCDate())}T${pad(hongKongTime.getUTCHours())}:${pad(hongKongTime.getUTCMinutes())}:${pad(hongKongTime.getUTCSeconds())}+08:00`;
}
