const ONE_DAY_IN_MILLISECONDS = 86400000;

export const urgencyCategory = [
	{ label: 'Overdue', days: 0 },
	{ label: 'Soon', days: 7 },
	{ label: 'Kind of Soon', days: 14 },
	{ label: 'Not Soon', days: 30 },
	{ label: 'Inactive', days: 60 },
	{ label: 'Purchased', days: null },
];

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * Get the difference between two dates in days expressed as an absolute value
 * If the newer date is not provided, get the difference between the older date and
 * current date in days expressed as an absolute value.
 * If the older date is not provided, the days between the newer date and current date are returned
 * @param {Object} olderDate The date which occurs first chronologically
 * @param {Object} newerDate The date which occurs second chronologically. Defaults to current date
 * @returns {number} The difference between the dates in days
 */
export function getDaysBetweenDates(olderDate, newerDate) {
	const currentDate = new Date();

	if (newerDate && olderDate) {
		return (
			Math.abs(newerDate.toDate() - olderDate.toDate()) /
			ONE_DAY_IN_MILLISECONDS
		);
	}

	if (!newerDate) {
		return Math.abs(currentDate - olderDate.toDate()) / ONE_DAY_IN_MILLISECONDS;
	}

	if (!olderDate) {
		return (newerDate.toDate() - currentDate) / ONE_DAY_IN_MILLISECONDS;
	}
}
