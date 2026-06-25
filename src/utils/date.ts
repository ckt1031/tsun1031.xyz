import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const HONG_KONG_TIME_ZONE = 'Asia/Hong_Kong';

const HONG_KONG_DATE_FORMATS = [
	'YYYY-MM-DD',
	'YYYY-MM-DD HH:mm',
	'YYYY-MM-DD HH:mm:ss',
	'YYYY-MM-DDTHH:mm',
	'YYYY-MM-DDTHH:mm:ss',
];
const HAS_TIME_ZONE_RE = /(?:Z|[+-]\d{2}:?\d{2})$/i;

export function parseHongKongDate(value: string) {
	const trimmed = value.trim();
	let parsed = HAS_TIME_ZONE_RE.test(trimmed) ? dayjs(trimmed) : undefined;

	if (!parsed) {
		for (const format of HONG_KONG_DATE_FORMATS) {
			try {
				const date = dayjs.tz(trimmed, format, HONG_KONG_TIME_ZONE);

				if (date.isValid() && date.format(format) === trimmed) {
					parsed = date;
					break;
				}
			} catch {}
		}
	}

	if (!parsed?.isValid()) {
		throw new Error(`Invalid date: ${value}`);
	}

	return parsed.toDate();
}

export function formatHongKongDate(date: Date | string) {
	return dayjs(date)
		.tz(HONG_KONG_TIME_ZONE)
		.format('MMMM D, YYYY h:mm A [HKT]');
}

export function formatHongKongISOString(date: Date | string) {
	return dayjs(date).tz(HONG_KONG_TIME_ZONE).format('YYYY-MM-DDTHH:mm:ssZ');
}
